import { Bullets, Section, Tag } from "@/components/Section";
import type { ResumeData } from "@/content/types";

/** Sección propia porque es el diferenciador más fuerte del perfil. */
export function AiPractice({ data }: { data: ResumeData }) {
  return (
    <Section id="ia" title={data.ui.sections.ai}>
      <div className="print-block">
        <p className="text-[15px] leading-relaxed text-muted">{data.ai.summary}</p>
        <Bullets items={data.ai.highlights} />
        <div className="mt-4 flex flex-wrap gap-1.5">
          {data.ai.tools.map((tool) => (
            <Tag key={tool}>{tool}</Tag>
          ))}
        </div>
      </div>
    </Section>
  );
}
