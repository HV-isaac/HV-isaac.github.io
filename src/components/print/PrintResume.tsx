import type { Job, ResumeData } from "@/content/types";

/**
 * Origen del PDF.
 *
 * No reutiliza los componentes de la web a propósito: el sitio es un portafolio
 * con movimiento, tarjetas y filtros, y nada de eso tiene sentido en un CV
 * impreso que un reclutador abre en pantalla o en papel. Lo que sí comparte —y
 * es lo que de verdad no puede desincronizarse— son los datos: ambos leen el
 * mismo `ResumeData`.
 *
 * Aquí todo es una columna, sin color de fondo, sin interacción y con saltos de
 * página controlados.
 */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 border-b border-border pb-1 text-[11pt] font-semibold uppercase tracking-[0.12em]">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 space-y-0.5">
      {items.map((item) => (
        <li key={item} className="relative pl-3.5 leading-snug text-muted">
          <span aria-hidden="true" className="absolute left-0">
            ·
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function JobEntry({ job }: { job: Job }) {
  return (
    <article className="print-block mt-3 first:mt-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold">
          {job.role} · {job.company}
        </h3>
        {(job.period || job.location) && (
          <p className="shrink-0 text-[9.5pt] text-muted">
            {[job.period, job.location].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
      <Bullets items={job.highlights} />
      {job.tech && job.tech.length > 0 && (
        <p className="mt-1 text-[9.5pt] text-muted">{job.tech.join(" · ")}</p>
      )}
    </article>
  );
}

export function PrintResume({ data }: { data: ResumeData }) {
  const { profile, ui } = data;

  const contact = [
    profile.email,
    profile.phone,
    ...profile.links.map((link) => link.href.replace(/^https?:\/\/(www\.)?/, "")),
  ].filter(Boolean);

  return (
    <main className="mx-auto max-w-[190mm] px-10 py-10 text-[10.5pt] leading-normal print:max-w-none print:px-0 print:py-0">
      <header className="print-block border-b border-border pb-3">
        <h1 className="text-[22pt] font-semibold leading-tight tracking-tight">{profile.name}</h1>
        <p className="mt-0.5 text-[11.5pt]">{profile.title}</p>
        <p className="mt-1 text-[9.5pt] text-muted">{profile.location}</p>
        <p className="mt-1 text-[9.5pt] text-muted">{contact.join("  ·  ")}</p>
      </header>

      <section className="mt-4 print-block">
        <SectionTitle>{ui.sections.about}</SectionTitle>
        <p className="leading-snug text-muted">{profile.summary}</p>
      </section>

      <section className="mt-4">
        <SectionTitle>{ui.sections.ai}</SectionTitle>
        <p className="leading-snug text-muted">{data.ai.summary}</p>
        <Bullets items={data.ai.highlights} />
        <p className="mt-1 text-[9.5pt] text-muted">{data.ai.tools.join(" · ")}</p>
      </section>

      <section className="mt-4">
        <SectionTitle>{ui.sections.experience}</SectionTitle>
        {data.experience.map((job) => (
          <JobEntry key={`${job.company}-${job.role}`} job={job} />
        ))}
      </section>

      <section className="mt-4">
        <SectionTitle>{ui.sections.projects}</SectionTitle>
        {data.projects.map((project) => (
          <article key={project.name} className="print-block mt-3 first:mt-0">
            <h3 className="font-semibold">{project.name}</h3>
            <p className="leading-snug text-muted">{project.description}</p>
            <Bullets items={project.highlights} />
          </article>
        ))}
      </section>

      <section className="mt-4 print-block">
        <SectionTitle>{ui.sections.skills}</SectionTitle>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-1">
          {data.skills.map((group) => (
            <div key={group.category} className="print-block flex gap-2">
              <dt className="shrink-0 font-semibold">{group.category}:</dt>
              <dd className="text-muted">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-4 print-block">
        <SectionTitle>{ui.sections.education}</SectionTitle>
        {data.education.map((item) => (
          <article key={item.institution} className="print-block">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-semibold">{item.degree}</h3>
              {item.period && <p className="shrink-0 text-[9.5pt] text-muted">{item.period}</p>}
            </div>
            <p className="text-muted">{item.institution}</p>
            {item.note && <p className="mt-0.5 leading-snug text-muted">{item.note}</p>}
          </article>
        ))}
        {/* Sin enlace al certificado: una ruta relativa no resuelve dentro del PDF. */}
        {data.certifications.length > 0 && (
          <div className="print-block mt-2">
            <h3 className="font-semibold">{ui.certifications}</h3>
            <Bullets
              items={data.certifications.map((item) =>
                [item.name, item.issuer, item.period].filter(Boolean).join(" · "),
              )}
            />
          </div>
        )}
      </section>
    </main>
  );
}
