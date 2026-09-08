import { Section } from "@/components/Section";
import type { ResumeData } from "@/content/types";

export function Education({ data }: { data: ResumeData }) {
  return (
    <Section id="educacion" title={data.ui.sections.education}>
      <div className="space-y-6 print:space-y-4">
        {data.education.map((item) => (
          <article key={item.institution} className="print-block">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[17px] font-semibold">{item.degree}</h3>
              {item.period && <p className="text-sm text-muted">{item.period}</p>}
            </div>
            <p className="mt-0.5 text-[15px] text-muted">{item.institution}</p>
            {item.note && (
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.note}</p>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
