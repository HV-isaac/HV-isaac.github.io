import { asset } from "@/lib/asset";
import { pdfFile } from "@/lib/site";
import type { ResumeData } from "@/content/types";

export function Hero({ data }: { data: ResumeData }) {
  const { profile } = data;

  return (
    <header className="pb-8 print:pb-4">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl print:text-3xl">
        {profile.name}
      </h1>
      <p className="mt-2 text-lg text-accent print:text-base">{profile.title}</p>
      <p className="mt-1 text-[15px] text-muted">{profile.location}</p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[15px]">
        <a href={`mailto:${profile.email}`} className="text-muted hover:text-accent">
          {profile.email}
        </a>
        {profile.phone && (
          <a href={`tel:${profile.phone}`} className="text-muted hover:text-accent">
            {profile.phone}
          </a>
        )}
        {profile.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="no-print mt-7 flex flex-wrap gap-3">
        <a
          href={`#${"contacto"}`}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
        >
          {data.ui.contactMe}
        </a>
        {/* El PDF lo genera el script de build dentro de `out/`, así que es un
            enlace a un archivo, no un import: no existe durante `next build`. */}
        <a
          href={asset(`/${pdfFile(data.locale)}`)}
          download
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          {data.ui.downloadPdf}
        </a>
      </div>

      <p className="mt-8 max-w-[65ch] text-[15px] leading-relaxed text-muted print:mt-4">
        {profile.summary}
      </p>
    </header>
  );
}
