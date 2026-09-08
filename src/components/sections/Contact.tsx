import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { ResumeData } from "@/content/types";

export function Contact({ data }: { data: ResumeData }) {
  return (
    <Section id="contacto" title={data.ui.sections.contact}>
      <Reveal>
        <ContactForm data={data} />
      </Reveal>
    </Section>
  );
}
