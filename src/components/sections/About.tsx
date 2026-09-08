import { Reveal } from "@/components/Reveal";
import { stagger } from "@/lib/stagger";
import { Section } from "@/components/Section";
import type { ResumeData } from "@/content/types";

export function About({ data }: { data: ResumeData }) {
  const { stats } = data;

  return (
    <Section id="perfil" title={data.ui.sections.about}>
      <Reveal>
        <p className="max-w-[62ch] text-[17px] leading-relaxed text-muted">
          {data.profile.summary}
        </p>
      </Reveal>

      {/* `stats` arranca vacío a propósito: en un CV una cifra inventada hace
          más daño que la ausencia del bloque. */}
      {stats.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={stagger(index)} className="bg-surface px-5 py-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-3xl font-semibold text-transparent">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-muted">{stat.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      )}
    </Section>
  );
}
