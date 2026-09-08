import { Reveal } from "@/components/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/Section";
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
      </div>
    </Section>
  );
}
