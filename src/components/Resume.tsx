import { About } from "@/components/sections/About";
import { AiPractice } from "@/components/sections/AiPractice";
import { Aurora } from "@/components/Aurora";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Intro } from "@/components/Intro";
import { Projects } from "@/components/sections/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Skills } from "@/components/sections/Skills";
import { TopControls } from "@/components/TopControls";
import type { ResumeData } from "@/content/types";

/**
 * Versión web del CV: columna izquierda fija con la presentación y el índice, y
 * el contenido desplazándose al lado. La versión que alimenta el PDF vive en
 * `components/print/` y es deliberadamente sobria.
 */
export function Resume({ data }: { data: ResumeData }) {
  return (
    <>
      <ScrollProgress />
      <Aurora />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {data.ui.skipToContent}
      </a>

      <TopControls data={data} />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:flex lg:gap-x-16 lg:py-0 xl:gap-x-24">
        <div className="lg:w-[24rem] lg:shrink-0">
          <Intro data={data} />
        </div>

        {/* `min-w-0` es lo que impide que las rejillas de tarjetas desborden:
            sin él, un elemento flex no baja de su ancho de contenido. */}
        <main id="contenido" className="mt-16 lg:mt-0 lg:min-w-0 lg:flex-1 lg:py-24">
          <About data={data} />
          <AiPractice data={data} />
          <Experience data={data} />
          <Projects data={data} />
          <Skills data={data} />
          <Education data={data} />
          <Contact data={data} />

          <footer className="mt-8 border-t border-border pt-6 font-mono text-xs uppercase tracking-wider text-muted">
            {data.ui.footer}
          </footer>
        </main>
      </div>
    </>
  );
}
