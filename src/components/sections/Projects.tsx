import { Bullets, Section, Tag } from "@/components/Section";
import type { ResumeData } from "@/content/types";

export function Projects({ data }: { data: ResumeData }) {
  return (
    <Section id="proyectos" title={data.ui.sections.projects}>
      <div className="space-y-8 print:space-y-5">
        {data.projects.map((project) => (
          <article key={project.name} className="print-block">
            <h3 className="text-[17px] font-semibold">
              {project.href ? (
                <a href={project.href} className="hover:text-accent" target="_blank" rel="noreferrer">
                  {project.name}
                </a>
              ) : (
                project.name
              )}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{project.description}</p>

            <Bullets items={project.highlights} />

            {project.tech && project.tech.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((item) => (
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
