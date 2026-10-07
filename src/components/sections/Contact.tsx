import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { stagger } from "@/lib/stagger";
import { whatsappUrl } from "@/lib/whatsapp";
import type { ResumeData } from "@/content/types";

export function Contact({ data }: { data: ResumeData }) {
  const { phone } = data.profile;
  const t = data.ui.whatsapp;

  return (
    <Section id="contacto" title={data.ui.sections.contact}>
      <Reveal>
        <ContactForm data={data} />
      </Reveal>

      {phone && (
        <Reveal
          delay={stagger(1)}
          className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface/60 p-5"
        >
          <p className="text-muted">{t.intro}</p>
          <a
            href={whatsappUrl(phone, t.message)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            {t.cta}
          </a>
        </Reveal>
      )}
    </Section>
  );
}
