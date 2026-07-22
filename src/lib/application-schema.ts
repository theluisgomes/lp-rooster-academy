import { z } from "zod";

/** Digits-only BR phone length after stripping non-digits (DDD + number). */
const phoneDigits = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => v.length >= 10 && v.length <= 11, {
    message: "Informe um telefone válido com DDD",
  });

export const applicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  phone: phoneDigits,
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido")
    .max(160),
  motivation: z
    .string()
    .trim()
    .min(20, "Conte um pouco mais sobre sua motivação (mín. 20 caracteres)")
    .max(2000, "Texto muito longo"),
  lgpd: z.boolean().refine((value) => value === true, {
    message: "É necessário autorizar o contato para enviar a candidatura",
  }),
  /** Honeypot — must stay empty. */
  website: z.string().optional().default(""),
  utm: z.record(z.string(), z.string()).optional().default({}),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export type SubmitApplicationResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
