import { AiPractice } from "@/components/sections/AiPractice";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import type { ResumeData } from "@/content/types";

/**
 * Origen del PDF. Reutiliza exactamente las mismas secciones que la web —por eso
 * el PDF no puede quedar desincronizado— pero sin navegación, sin formulario y
 * sin cambio de tema. Los `@media print` de globals.css hacen el resto.
 */
export function PrintResume({ data }: { data: ResumeData }) {
  return (
    <main className="mx-auto max-w-3xl px-8 py-10 print:max-w-none print:px-0 print:py-0">
      <Hero data={data} />

      <div className="space-y-10 print:space-y-6">
        <AiPractice data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Skills data={data} />
        <Education data={data} />
      </div>
    </main>
  );
}
