"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { stagger } from "@/lib/stagger";
import { Section, Tag } from "@/components/Section";
import { useSpotlight } from "@/hooks/useSpotlight";
import type { ResumeData } from "@/content/types";

export function Projects({ data }: { data: ResumeData }) {
  const [filter, setFilter] = useState<string | null>(null);
  const onPointerMove = useSpotlight<HTMLElement>();

  // Las etiquetas salen del propio contenido: añadir un proyecto con una
  // etiqueta nueva la hace aparecer sola en el filtro.
  const tags = useMemo(
    () => [...new Set(data.projects.flatMap((project) => project.tags))].sort(),
    [data.projects],
  );

  const visible = filter
    ? data.projects.filter((project) => project.tags.includes(filter))
    : data.projects;

  return (
    <Section id="proyectos" title={data.ui.sections.projects}>
      <Reveal role="group" aria-label={data.ui.sections.projects} className="mb-6 flex flex-wrap gap-2">
        <FilterButton active={filter === null} onClick={() => setFilter(null)}>
          {data.ui.allProjects}
        </FilterButton>
        {tags.map((tag) => (
          <FilterButton
            key={tag}
            active={filter === tag}
            onClick={() => setFilter(filter === tag ? null : tag)}
          >
            {tag}
          </FilterButton>
        ))}
      </Reveal>

      {/* `aria-live` para que el filtrado se anuncie: si no, quien usa lector de
          pantalla pulsa el filtro y no recibe ninguna señal de que algo cambió. */}
      <div aria-live="polite" className="grid gap-4 sm:grid-cols-2">
        {visible.map((project, index) => (
          // La `key` incluye el filtro activo para que React remonte las tarjetas
          // al filtrar: así la entrada se vuelve a reproducir en lugar de que el
          // resultado aparezca de golpe.
          <Reveal
            key={`${filter ?? "all"}-${project.name}`}
            as="article"
            delay={stagger(index)}
            onPointerMove={onPointerMove}
            className="spotlight group flex flex-col rounded-xl border border-border bg-surface/60 p-5 transition-transform duration-300 hover:-translate-y-1"
          >
            <h3 className="text-[17px] font-semibold">
              {project.href ? (
                <a href={project.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {project.name}
                  {/* Enlace en toda la tarjeta sin anidar elementos interactivos. */}
                  <span className="absolute inset-0 rounded-xl" />
                </a>
              ) : (
                project.name
              )}
            </h3>

            <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>

            <ul className="mt-3 flex-1 space-y-2 text-[15px] leading-relaxed text-muted">
              {project.highlights.map((item) => (
                <li key={item} className="relative pl-5">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.62em] size-1.5 rounded-full bg-gradient-to-br from-accent to-accent-2"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag} tone="accent">
                  {tag}
                </Tag>
              ))}
              {project.tech?.map((item) => <Tag key={item}>{item}</Tag>)}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-200 ${
        active
          ? "border-accent bg-accent text-on-accent"
          : "border-border text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}
