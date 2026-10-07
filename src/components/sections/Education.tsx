import { Reveal } from "@/components/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/Section";
import { asset } from "@/lib/asset";
import type { ResumeData } from "@/content/types";

export function Education({ data }: { data: ResumeData }) {
  return (
    <Section id="educacion" title={data.ui.sections.education}>
      <div className="space-y-4">
        {data.education.map((item, index) => (
          <Reveal
            key={item.institution}
            as="article"
            delay={stagger(index)}
            className="rounded-xl border border-border bg-surface/60 p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[17px] font-semibold">{item.degree}</h3>
              {item.period && (
                <p className="font-mono text-xs uppercase tracking-wider text-muted">{item.period}</p>
              )}
            </div>
            <p className="mt-1 text-[15px] text-muted">{item.institution}</p>
            {item.note && (
              <p className="mt-3 border-l-2 border-accent/40 pl-4 text-[15px] leading-relaxed text-muted">
                {item.note}
              </p>
            )}
          </Reveal>
        ))}

        {data.certifications.length > 0 && (
          <Reveal
            as="article"
            delay={stagger(data.education.length)}
            className="rounded-xl border border-border bg-surface/60 p-5"
          >
            <h3 className="mb-1 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {data.ui.certifications}
            </h3>
            <ul className="divide-y divide-border">
              {data.certifications.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 last:pb-0"
                >
                  <div>
                    <p className="text-[15px] font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-[14px] text-muted">
                      {[item.issuer, item.period].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  {/* Sin `download` a propósito: `npm run check` localiza el
                      botón del CV precisamente por ese atributo. */}
                  {item.href && (
                    <a
                      href={asset(item.href)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${data.ui.viewCertificate}: ${item.name}`}
                      className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
                    >
                      {data.ui.viewCertificate} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
