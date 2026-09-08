"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { stagger } from "@/lib/stagger";
import { Section, Tag } from "@/components/Section";
import { useSpotlight } from "@/hooks/useSpotlight";
import type { Job, ResumeData } from "@/content/types";

/**
 * Cuántos logros se ven sin desplegar. Se muestran siempre los primeros para que
 * la página siga sirviendo como CV escaneable: lo que se pliega es el detalle,
 * nunca la información esencial.
 */
const VISIBLE_HIGHLIGHTS = 2;

function ExperienceItem({ job, ui, index }: { job: Job; ui: ResumeData["ui"]; index: number }) {
  const [open, setOpen] = useState(false);
  const onPointerMove = useSpotlight<HTMLDivElement>();

  const hasMore = job.highlights.length > VISIBLE_HIGHLIGHTS;
  const shown = open ? job.highlights : job.highlights.slice(0, VISIBLE_HIGHLIGHTS);
  const panelId = `exp-${job.company.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Reveal as="li" delay={stagger(index)} className="relative pl-8 sm:pl-10">
      {/* Punto del hilo temporal, alineado con el título del puesto. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 size-3 rounded-full border-2 border-bg bg-gradient-to-br from-accent to-accent-2 ring-1 ring-border"
      />

      <div
        onPointerMove={onPointerMove}
        className="spotlight rounded-xl border border-transparent p-4 transition-colors duration-300 hover:border-border hover:bg-surface/60"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-[17px] font-semibold">
            {job.role} <span className="font-normal text-muted">· {job.company}</span>
          </h3>
          {/* `period` y `location` son opcionales: si no hay dato no se imprime
              nada, en vez de un hueco o un texto de relleno. */}
          {(job.period || job.location) && (
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {[job.period, job.location].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>

        <ul id={panelId} className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">
          {shown.map((item) => (
            <li key={item} className="relative pl-5">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.62em] size-1.5 rounded-full bg-gradient-to-br from-accent to-accent-2"
              />
              {item}
            </li>
          ))}
        </ul>

        {hasMore && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent transition-opacity hover:opacity-70"
          >
            {open ? ui.collapse : `${ui.expand} (+${job.highlights.length - VISIBLE_HIGHLIGHTS})`}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}

        {job.tech && job.tech.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {job.tech.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function Experience({ data }: { data: ResumeData }) {
  return (
    <Section id="experiencia" title={data.ui.sections.experience}>
      {/* El hilo vertical se difumina al final para que no choque con el borde
          de la sección. */}
      <ol className="relative space-y-6 before:absolute before:left-[5px] before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-border before:to-transparent">
        {data.experience.map((job, index) => (
          <ExperienceItem
            key={`${job.company}-${job.role}`}
            job={job}
            ui={data.ui}
            index={index}
          />
        ))}
      </ol>
    </Section>
  );
}
