import type { ResumeData } from "./types";

/**
 * ────────────────────────────────────────────────────────────────────────────
 *  DATOS PENDIENTES DE CONFIRMAR  (buscar "TODO" en este archivo)
 *  - Nombre completo tal como quieres que aparezca.
 *  - URLs reales de GitHub y LinkedIn.
 *  - Rangos de fechas de cada puesto: `period` es opcional a propósito, así que
 *    mientras no lo llenes simplemente no se muestra ninguna fecha. Nada de
 *    fechas inventadas.
 *  - Revisar la lista de tecnologías: están las que se dedujeron de tus
 *    proyectos, pero conviene que confirmes y añadas las que falten.
 * ────────────────────────────────────────────────────────────────────────────
 */

const NAME = "Isaac Hernández"; // TODO: confirmar nombre completo
const EMAIL = "hernandezisaac2142@gmail.com";
const GITHUB = "https://github.com/tu-usuario"; // TODO
const LINKEDIN = "https://www.linkedin.com/in/tu-usuario"; // TODO

export const es: ResumeData = {
  locale: "es",

  meta: {
    title: `${NAME} — Ingeniero de Software`,
    description:
      "Desarrollador fullstack con experiencia en aplicaciones web y móviles, especializado en desarrollo asistido por IA y flujos de trabajo con agentes.",
  },

  profile: {
    name: NAME,
    title: "Ingeniero de Software · Desarrollador Fullstack",
    roles: ["Fullstack", "Frontend", "Backend", "Móvil", "Desarrollo con IA"],
    location: "Navojoa, Sonora · Trabajo remoto",
    summary:
      "Desarrollador fullstack con experiencia entregando aplicaciones web y móviles de principio a fin, desde el diseño de la base de datos hasta la interfaz que usa el cliente final. He construido sistemas de gestión de servicios automotrices, logística y facturación, además de proyectos propios llevados a producción. Trabajo el día a día con desarrollo asistido por IA —agentes, herramientas, MCP y hooks— integrándolo como parte real del proceso de ingeniería, no como un extra.",
    email: EMAIL,
    // phone: "+52 ...", // TODO: descomentar solo si quieres el teléfono público
    links: [
      { label: "GitHub", href: GITHUB },
      { label: "LinkedIn", href: LINKEDIN },
    ],
  },

  // Vacío a propósito: rellénalo solo con cifras que puedas sostener en una
  // entrevista. Mientras esté vacío, el bloque no se renderiza.
  // Ej.: { value: "5+", label: "años desarrollando" }
  stats: [],

  ai: {
    summary:
      "Uso IA como parte del flujo de ingeniería, no como autocompletado. Construyo y configuro agentes para tareas concretas del proyecto: automatizar revisiones, mantener contratos de API sincronizados entre repos y acelerar el trabajo repetitivo sin perder control sobre el código que se entrega.",
    highlights: [
      "Programación con agentes: definición de tareas, contexto y límites para que el agente trabaje sobre un repositorio real con criterio.",
      "Skills y herramientas propias: procedimientos reutilizables que capturan el conocimiento del proyecto y lo hacen repetible para todo el equipo.",
      "MCP (Model Context Protocol): conexión de agentes con las fuentes de datos y servicios internos de cada proyecto.",
      "Hooks: automatización de validaciones y comprobaciones que se ejecutan solas en cada cambio.",
    ],
    tools: ["Claude Code", "Roo Code", "Gemini", "MCP", "Agentes y skills", "Hooks"],
  },

  experience: [
    {
      company: "Koud",
      role: "Desarrollador de software",
      // period: "", // TODO
      location: "Remoto",
      highlights: [
        "Desarrollo y mantenimiento de producto en un equipo distribuido, trabajando en remoto de forma autónoma.",
      ],
      // TODO: añadir 2-3 logros concretos (qué construiste, para qué sirvió, resultado medible)
    },
    {
      company: "Kybel",
      role: "Cofundador · Desarrollador",
      // period: "", // TODO
      highlights: [
        "Emprendimiento propio junto a un equipo de tres desarrolladores.",
        "Participación en todas las etapas del producto: definición del alcance, arquitectura, desarrollo y entrega.",
      ],
    },
    {
      company: "Freelance",
      role: "Desarrollador Fullstack · Frontend · Backend",
      // period: "", // TODO
      highlights: [
        "Desarrollo de aplicaciones web para gestión de servicios y refacciones automotrices, cubriendo inventario, órdenes de servicio y seguimiento.",
        "Sistemas de logística y de facturación para distintas empresas.",
        "Aplicaciones móviles entregadas de principio a fin, desde el desarrollo hasta la publicación.",
        "Trabajo indistinto en frontend, backend o el stack completo según lo que necesitaba cada cliente.",
      ],
    },
    {
      company: "Ayuntamiento de Navojoa",
      role: "Desarrollador · Líder técnico",
      // period: "", // TODO
      highlights: [
        "Desarrollo completo de la aplicación de reportes ciudadanos y de su panel administrativo para servidores públicos.",
        "Liderazgo de un equipo reducido de desarrollo para construir aplicaciones adicionales dentro de la misma institución.",
        "Coordinación técnica: reparto de tareas, revisión de código y acompañamiento del equipo.",
      ],
    },
  ],

  projects: [
    {
      name: "Reportes ciudadanos — Navojoa",
      tags: ["Móvil", "Panel admin", "Sector público"],
      description:
        "Aplicación móvil que permite a la ciudadanía levantar reportes de incidencias en la ciudad, acompañada de un panel administrativo donde los servidores públicos dan seguimiento y resolución a cada caso.",
      highlights: [
        "Proyecto individual completo: diseño, desarrollo móvil, backend y panel web.",
        "Flujo de extremo a extremo, desde que el ciudadano levanta el reporte hasta que la dependencia lo cierra.",
        "Puesto en manos de usuarios reales dentro de la administración pública.",
      ],
    },
    {
      name: "Gestión de servicios y refacciones automotrices",
      tags: ["Web", "Gestión", "Inventario"],
      description:
        "Plataforma web para talleres: control de inventario de refacciones, órdenes de servicio y seguimiento del estado de cada vehículo.",
      highlights: [
        "Modelado del inventario y de las órdenes de servicio sobre un flujo de trabajo real de taller.",
      ],
    },
    {
      name: "Logística y facturación",
      tags: ["Web", "Gestión", "Facturación"],
      description:
        "Aplicaciones de gestión logística y de emisión de facturas desarrolladas para distintas empresas.",
      highlights: [
        "Automatización de procesos administrativos que antes se llevaban a mano.",
      ],
    },
  ],

  // TODO: revisar y completar. Están las tecnologías que se desprenden de tus
  // proyectos; añade, quita o reordena según lo que realmente quieras destacar.
  skills: [
    {
      category: "Frontend",
      items: ["TypeScript", "JavaScript", "Angular", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "NestJS", "APIs REST", "Autenticación y autorización (JWT)"],
    },
    {
      category: "Móvil",
      items: ["Flutter", "Dart"],
    },
    {
      category: "Bases de datos",
      items: ["PostgreSQL", "MySQL"],
    },
    {
      category: "Herramientas y prácticas",
      items: ["Git", "Docker", "CI/CD", "Metodologías ágiles", "Liderazgo técnico"],
    },
    {
      category: "Desarrollo con IA",
      items: ["Claude Code", "Roo Code", "Gemini", "MCP", "Agentes", "Skills", "Hooks"],
    },
  ],

  education: [
    {
      institution: "Instituto Tecnológico de Sonora (ITSON) — Campus Navojoa",
      degree: "Ingeniería en Software",
      // period: "", // TODO
      note: "Plan de estudios de desarrollo de software completado en su totalidad. En proceso de acreditar los requisitos institucionales de inglés y actividades culturales.",
    },
  ],

  ui: {
    sections: {
      about: "Perfil",
      experience: "Experiencia",
      projects: "Proyectos destacados",
      ai: "Desarrollo con IA",
      skills: "Habilidades técnicas",
      education: "Educación",
      contact: "Contacto",
    },
    downloadPdf: "Descargar CV en PDF",
    contactMe: "Contáctame",
    allProjects: "Todos",
    expand: "Ver detalle",
    collapse: "Ocultar detalle",
    scrollHint: "Desliza para ver más",
    switchLanguage: "Ver esta página en inglés",
    switchLanguageShort: "EN",
    toggleTheme: "Cambiar entre tema claro y oscuro",
    skipToContent: "Saltar al contenido",
    form: {
      intro:
        "¿Tienes un proyecto en mente o una vacante que encaje? Escríbeme y te respondo.",
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      success: "¡Mensaje enviado! Te respondo en cuanto lo lea.",
      error: "No se pudo enviar el mensaje. Escríbeme directamente por correo.",
      fallbackIntro: "¿Tienes un proyecto en mente o una vacante que encaje?",
      fallbackCta: "Escríbeme por correo",
    },
    footer: `${NAME} · Hecho con Next.js`,
  },
};
