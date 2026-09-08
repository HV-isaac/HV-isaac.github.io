import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import type { ResumeData } from "@/content/types";

export function Contact({ data }: { data: ResumeData }) {
  return (
    <Section id="contacto" title={data.ui.sections.contact}>
      <ContactForm data={data} />

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
        <a href={`mailto:${data.profile.email}`} className="text-muted hover:text-accent">
          {data.profile.email}
        </a>
        {data.profile.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
