"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { submitApplication } from "@/app/actions/submit-application";
import { SectionTracker } from "@/components/analytics/SectionTracker";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/content/landing-content";
import { pushEvent } from "@/lib/analytics/dataLayer";
import { readStoredUtmParams } from "@/lib/analytics/utm";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ApplicationFormSection() {
  const { application, offer } = landingContent;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [phone, setPhone] = useState("");
  const formStarted = useRef(false);

  function handleFormStart() {
    if (formStarted.current) return;
    formStarted.current = true;
    pushEvent("form_start", { form_id: application.formId });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});
    setStatus("submitting");

    pushEvent("form_submit", { form_id: application.formId });

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      motivation: String(formData.get("motivation") ?? ""),
      lgpd: formData.get("lgpd") === "on",
      website: String(formData.get("website") ?? ""),
      utm: readStoredUtmParams(),
    };

    const result = await submitApplication(payload);

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.error || application.errorMessage);
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      pushEvent("form_error", {
        form_id: application.formId,
        error_type: result.fieldErrors ? "validation" : "server",
      });
      return;
    }

    setStatus("success");
    pushEvent("generate_lead", {
      form_id: application.formId,
      value: offer.priceValue,
      currency: "BRL",
    });
    form.reset();
    setPhone("");
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-black/40 focus-visible:border-orange";

  return (
    <SectionTracker
      sectionId={application.id}
      className="section-y bg-mint"
    >
      <div className="container-page max-w-2xl">
        <Reveal>
          <SectionTitle as="h2" size="ml" className="text-black">
            {application.title}
          </SectionTitle>
          <p className="mt-4 text-lg text-black/80">{application.description}</p>

          {status === "success" ? (
            <div
              className="mt-10 rounded-lg bg-white p-8 text-center"
              role="status"
            >
              <p className="text-2xl font-bold text-orange">
                {application.successTitle}
              </p>
              <p className="mt-3 text-black/80">{application.successMessage}</p>
            </div>
          ) : (
            <form
              className="relative mt-10 flex flex-col gap-6"
              onSubmit={handleSubmit}
              onFocusCapture={handleFormStart}
              noValidate
            >
              {/* Honeypot */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className="font-bold text-black">
                  {application.fields.name.label}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={application.fields.name.placeholder}
                  className={inputClass}
                />
                {fieldErrors.name?.[0] ? (
                  <p className="mt-1 text-sm text-red">{fieldErrors.name[0]}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="phone" className="font-bold text-black">
                  {application.fields.phone.label}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder={application.fields.phone.placeholder}
                  className={inputClass}
                />
                {fieldErrors.phone?.[0] ? (
                  <p className="mt-1 text-sm text-red">{fieldErrors.phone[0]}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="font-bold text-black">
                  {application.fields.email.label}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={application.fields.email.placeholder}
                  className={inputClass}
                />
                {fieldErrors.email?.[0] ? (
                  <p className="mt-1 text-sm text-red">{fieldErrors.email[0]}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="motivation" className="font-bold text-black">
                  {application.fields.motivation.label}
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  required
                  rows={5}
                  placeholder={application.fields.motivation.placeholder}
                  className={`${inputClass} resize-y`}
                />
                {fieldErrors.motivation?.[0] ? (
                  <p className="mt-1 text-sm text-red">
                    {fieldErrors.motivation[0]}
                  </p>
                ) : null}
              </div>

              <label className="flex items-start gap-3 text-sm text-black/85">
                <input
                  type="checkbox"
                  name="lgpd"
                  required
                  className="mt-1 h-5 w-5 flex-shrink-0 accent-orange"
                />
                <span>
                  {application.fields.lgpd.label}{" "}
                  <Link
                    href="/privacidade"
                    className="font-semibold text-orange underline-offset-2 hover:underline"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.lgpd?.[0] ? (
                <p className="-mt-4 text-sm text-red">{fieldErrors.lgpd[0]}</p>
              ) : null}

              {status === "error" && errorMessage ? (
                <p className="rounded-lg bg-red/10 px-4 py-3 text-sm text-red" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-orange px-10 py-4 text-xl font-bold text-white transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === "submitting"
                  ? application.submittingLabel
                  : application.submitLabel}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </SectionTracker>
  );
}
