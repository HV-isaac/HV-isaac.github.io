/**
 * Fuente de verdad del contenido del CV.
 *
 * Cada idioma exporta un objeto `ResumeData` completo, de modo que TypeScript
 * avisa si una traducción se queda atrás respecto a la otra.
 */

export type Locale = "es" | "en";

export interface Link {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  /** Párrafo de presentación. Se muestra en el hero y encabeza el PDF. */
  summary: string;
  email: string;
  /** Opcional: si se omite, no se muestra teléfono en ninguna parte. */
  phone?: string;
  links: Link[];
}

export interface Job {
  company: string;
  role: string;
  /** Ej. "2024 — Actualidad". Si se omite, no se renderiza fecha alguna. */
  period?: string;
  location?: string;
  /** Logros concretos, en pasado y con resultado cuando se pueda medir. */
  highlights: string[];
  tech?: string[];
}

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  tech?: string[];
  href?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period?: string;
  note?: string;
}

/** Etiquetas de interfaz: todo el texto que no es contenido del CV. */
export interface UIStrings {
  sections: {
    about: string;
    experience: string;
    projects: string;
    ai: string;
    skills: string;
    education: string;
    contact: string;
  };
  downloadPdf: string;
  contactMe: string;
  switchLanguage: string;
  switchLanguageShort: string;
  toggleTheme: string;
  skipToContent: string;
  form: {
    intro: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    fallbackIntro: string;
    fallbackCta: string;
  };
  footer: string;
}

export interface ResumeData {
  locale: Locale;
  meta: {
    title: string;
    description: string;
  };
  profile: Profile;
  /** Sección propia para el trabajo con IA y agentes: es el diferenciador del perfil. */
  ai: {
    summary: string;
    highlights: string[];
    tools: string[];
  };
  experience: Job[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  ui: UIStrings;
}
