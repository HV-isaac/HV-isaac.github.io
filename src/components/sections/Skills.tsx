"use client";

import { Reveal } from "@/components/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/Section";
import { useSpotlight } from "@/hooks/useSpotlight";
import type { ResumeData } from "@/content/types";

export function Skills({ data }: { data: ResumeData }) {
  const onPointerMove = useSpotlight<HTMLDivElement>();

  // La cinta necesita la lista duplicada: el fotograma final del bucle coincide
  // así con el inicial y el desplazamiento no da un salto visible.
  const ticker = data.skills.flatMap((group) => group.items);

  return (
    <Section id="habilidades" title={data.ui.sections.skills}>
      <dl className="grid gap-4 sm:grid-cols-2">
        {data.skills.map((group, index) => (
          <Reveal
            key={group.category}
            delay={stagger(index)}
            onPointerMove={onPointerMove}
            className="spotlight rounded-xl border border-border bg-surface/60 p-5 transition-transform duration-300 hover:-translate-y-1"
          >
            <dt className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {group.category}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-2.5 py-1 text-[12.5px] leading-none text-muted transition-colors hover:border-accent hover:text-fg"
                >
                  {item}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>

      <div
        aria-hidden="true"
        className="marquee no-print relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
      >
        <div className="marquee-track flex w-max gap-3">
          {[...ticker, ...ticker].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
