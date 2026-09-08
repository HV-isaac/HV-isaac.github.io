import { RoleRotator } from "@/components/RoleRotator";
import { SideNav } from "@/components/SideNav";
import { asset } from "@/lib/asset";
import { sectionTitles } from "@/lib/sections";
import { pdfFile } from "@/lib/site";
import type { ResumeData } from "@/content/types";

/**
 * Columna izquierda: en escritorio queda fija mientras el contenido se desplaza
 * al lado; en móvil es simplemente el encabezado de la página.
 */
export function Intro({ data }: { data: ResumeData }) {
  const { profile } = data;

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:flex-col lg:justify-between lg:py-24">
      <div>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          {profile.location}
        </p>

        <h1 className="text-[clamp(2.5rem,7vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
          {profile.name}
        </h1>

        <p className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
          <RoleRotator roles={profile.roles} />
        </p>

        <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">{profile.title}</p>

        <div className="mt-10 hidden lg:block">
          <SideNav titles={sectionTitles(data)} />
        </div>
      </div>

      <div className="mt-10 lg:mt-0">
        <div className="flex flex-wrap gap-3">
          <a
            href="#contacto"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-transform duration-200 hover:-translate-y-0.5"
          >
            {data.ui.contactMe}
          </a>
          {/* El PDF lo genera el script de build dentro de `out/`: es un enlace a
              un archivo, no un import, así que no existe durante `next build`. */}
          <a
            href={asset(`/${pdfFile(data.locale)}`)}
            download
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            {data.ui.downloadPdf}
          </a>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-accent">
              {profile.email}
            </a>
          </li>
          {profile.phone && (
            <li>
              <a href={`tel:${profile.phone}`} className="text-muted transition-colors hover:text-accent">
                {profile.phone}
              </a>
            </li>
          )}
          {profile.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
