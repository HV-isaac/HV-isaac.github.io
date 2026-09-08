import type { ResumeData } from "@/content/types";

/**
 * Los ids son los mismos en los dos idiomas a propósito: son anclas de URL, y
 * cambiarlas al traducir rompería cualquier enlace que alguien haya compartido.
 */
export const SECTION_IDS = [
  "perfil",
  "ia",
  "experiencia",
  "proyectos",
  "habilidades",
  "educacion",
  "contacto",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function sectionTitles(data: ResumeData): Record<SectionId, string> {
  const { sections } = data.ui;
  return {
    perfil: sections.about,
    ia: sections.ai,
    experiencia: sections.experience,
    proyectos: sections.projects,
    habilidades: sections.skills,
    educacion: sections.education,
    contacto: sections.contact,
  };
}
