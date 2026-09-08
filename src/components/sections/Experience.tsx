import { Bullets, Section, Tag } from "@/components/Section";
import type { ResumeData } from "@/content/types";

export function Experience({ data }: { data: ResumeData }) {
  return (
    <Section id="experiencia" title={data.ui.sections.experience}>
      <div className="space-y-8 print:space-y-5">
        {data.experience.map((job) => (
          <article key={`${job.company}-${job.role}`} className="print-block">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[17px] font-semibold">
                {job.role} <span className="text-muted">· {job.company}</span>
              </h3>
              {/* `period` y `location` son opcionales: si no hay dato, no se
                  imprime nada en lugar de un hueco o un texto de relleno. */}
              {(job.period || job.location) && (
                <p className="text-sm text-muted">
                  {[job.period, job.location].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>

            <Bullets items={job.highlights} />

            {job.tech && job.tech.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.tech.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
