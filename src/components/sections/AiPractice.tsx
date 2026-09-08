"use client";

import { Reveal } from "@/components/Reveal";
import { stagger } from "@/lib/stagger";
import { Section, Tag } from "@/components/Section";
import { useSpotlight } from "@/hooks/useSpotlight";
import type { ResumeData } from "@/content/types";

/** Sección propia porque es el diferenciador más fuerte del perfil. */
export function AiPractice({ data }: { data: ResumeData }) {
  const onPointerMove = useSpotlight<HTMLLIElement>();

  return (
    <Section id="ia" title={data.ui.sections.ai}>
      <Reveal>
        <p className="max-w-[62ch] text-[15px] leading-relaxed text-muted">{data.ai.summary}</p>
      </Reveal>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {data.ai.highlights.map((highlight, index) => (
          <Reveal
            key={highlight}
            as="li"
            delay={stagger(index)}
            onPointerMove={onPointerMove}
            className="spotlight rounded-xl border border-border bg-surface/60 p-5 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{highlight}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120} className="mt-6 flex flex-wrap gap-2">
        {data.ai.tools.map((tool) => (
          <Tag key={tool} tone="accent">
            {tool}
          </Tag>
        ))}
      </Reveal>
    </Section>
  );
}
