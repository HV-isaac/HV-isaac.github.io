import { Section, Tag } from "@/components/Section";
import type { ResumeData } from "@/content/types";

export function Skills({ data }: { data: ResumeData }) {
  return (
    <Section id="habilidades" title={data.ui.sections.skills}>
      <dl className="grid gap-5 sm:grid-cols-2 print:grid-cols-2 print:gap-3">
        {data.skills.map((group) => (
          <div key={group.category} className="print-block">
            <dt className="mb-2 text-[15px] font-semibold print:mb-1">{group.category}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
