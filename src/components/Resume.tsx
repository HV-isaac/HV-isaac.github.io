import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AiPractice } from "@/components/sections/AiPractice";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import type { ResumeData } from "@/content/types";

/** Versión web del CV. La versión para el PDF vive en `PrintResume`. */
export function Resume({ data }: { data: ResumeData }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {data.ui.skipToContent}
      </a>

      <div className="no-print fixed right-4 top-4 z-40 flex gap-2 sm:right-6 sm:top-6">
        <LanguageSwitch data={data} />
        <ThemeToggle label={data.ui.toggleTheme} />
      </div>

      <main id="contenido" className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <Hero data={data} />

        <div className="space-y-12">
          <AiPractice data={data} />
          <Experience data={data} />
          <Projects data={data} />
          <Skills data={data} />
          <Education data={data} />
          <Contact data={data} />
        </div>

        <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
          {data.ui.footer}
        </footer>
      </main>
    </>
  );
}
