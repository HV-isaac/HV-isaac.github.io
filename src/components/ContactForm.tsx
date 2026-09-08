"use client";

import { useState } from "react";
import type { ResumeData } from "@/content/types";

/**
 * La access key de Web3Forms es pública por diseño: viaja en el HTML y lo único
 * que autoriza es enviar correo al buzón que la registró. Aun así se lee de una
 * variable de entorno para poder rotarla sin tocar el código.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[15px] text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

export function ContactForm({ data }: { data: ResumeData }) {
  const t = data.ui.form;
  const [status, setStatus] = useState<Status>("idle");

  // Sin key configurada el formulario no puede funcionar, así que en vez de
  // fallar en silencio al pulsar «Enviar» se ofrece el correo directo.
  if (!ACCESS_KEY) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <p className="text-muted">{t.fallbackIntro}</p>
        <a
          href={`mailto:${data.profile.email}`}
          className="mt-4 inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
        >
          {t.fallbackCta}
        </a>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-border bg-surface p-6">
      <p className="text-muted">{t.intro}</p>

      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input
        type="hidden"
        name="subject"
        value={`Nuevo mensaje desde el CV (${data.locale.toUpperCase()})`}
      />
      <input type="hidden" name="from_name" value={data.profile.name} />

      {/* Honeypot: Web3Forms descarta el envío si un bot rellena este campo. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t.name}</span>
          <input type="text" name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t.email}</span>
          <input type="email" name="email" required autoComplete="email" className={field} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium">{t.message}</span>
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>

        {/* aria-live para que un lector de pantalla anuncie el resultado del envío. */}
        <p aria-live="polite" className="text-sm">
          {status === "success" && <span className="text-accent">{t.success}</span>}
          {status === "error" && (
            <span className="text-red-600 dark:text-red-400">
              {t.error}{" "}
              <a href={`mailto:${data.profile.email}`} className="underline">
                {data.profile.email}
              </a>
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
