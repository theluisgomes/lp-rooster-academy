"use server";

import { headers } from "next/headers";
import {
  applicationSchema,
  type SubmitApplicationResult,
} from "@/lib/application-schema";

/** Simple in-memory rate limit (per serverless instance). */
const hits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 8;
const WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function submitApplication(
  raw: unknown,
): Promise<SubmitApplicationResult> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return {
      ok: false,
      error: "Muitas tentativas. Aguarde um minuto e tente novamente.",
    };
  }

  const parsed = applicationSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Verifique os campos e tente novamente.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data;

  // Honeypot tripped — pretend success to avoid tipping off bots.
  if (data.website && data.website.length > 0) {
    return { ok: true };
  }

  const payload = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    motivation: data.motivation,
    submittedAt: new Date().toISOString(),
    utm: data.utm ?? {},
    source: "lp-rooster-academy",
    formId: "turma_application",
  };

  const webhookUrl = process.env.LEADS_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[submitApplication] LEADS_WEBHOOK_URL ausente — lead:", payload);
      return { ok: true };
    }
    console.error("[submitApplication] LEADS_WEBHOOK_URL não configurada");
    return {
      ok: false,
      error: "Serviço de candidatura indisponível no momento.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        "[submitApplication] webhook status",
        response.status,
        await response.text().catch(() => ""),
      );
      return {
        ok: false,
        error: "Não foi possível enviar sua candidatura. Tente novamente.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("[submitApplication] webhook error", error);
    return {
      ok: false,
      error: "Não foi possível enviar sua candidatura. Tente novamente.",
    };
  }
}
