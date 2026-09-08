import type { ResumeData } from "./types";

/**
 * Traducción de `es.ts`. Mantener ambos archivos en paralelo: si añades una
 * entrada aquí o allá, TypeScript exige que la otra también exista.
 */

const NAME = "Jesús Isaac Hernández Valdez";
const EMAIL = "hernandezisaac2142@gmail.com";
const GITHUB = "https://github.com/HV-isaac";
const LINKEDIN = "https://www.linkedin.com/in/tu-usuario"; // TODO

export const en: ResumeData = {
  locale: "en",

  meta: {
    title: `${NAME} — Software Engineer`,
    description:
      "Fullstack developer with experience in web and mobile applications, specialized in AI-assisted development and agent-based workflows.",
  },

  profile: {
    name: NAME,
    title: "Software Engineer · Fullstack Developer",
    roles: ["Fullstack", "Frontend", "Backend", "Mobile", "AI-assisted"],
    location: "Navojoa, Sonora, Mexico · Open to remote",
    summary:
      "Fullstack developer with a track record of shipping web and mobile applications end to end, from database design to the interface the end user works with. I have built automotive service management, logistics and invoicing systems, along with personal projects taken all the way to production. AI-assisted development —agents, tools, MCP and hooks— is part of my daily engineering process, not an add-on.",
    email: EMAIL,
    // phone: "+52 ...", // TODO
    links: [
      { label: "GitHub", href: GITHUB },
      { label: "LinkedIn", href: LINKEDIN },
    ],
  },

  // Debe reflejar exactamente lo mismo que `stats` en es.ts.
  stats: [],

  ai: {
    summary:
      "I use AI as part of the engineering workflow, not as autocomplete. I build and configure agents for concrete project tasks: automating reviews, keeping API contracts in sync across repositories and speeding up repetitive work without losing control over the code that ships.",
    highlights: [
      "Agent-based development: defining tasks, context and boundaries so an agent can work on a real repository with sound judgement.",
      "Custom skills and tools: reusable procedures that capture project knowledge and make it repeatable for the whole team.",
      "MCP (Model Context Protocol): connecting agents to each project's internal data sources and services.",
      "Hooks: automating validations and checks that run on their own with every change.",
    ],
    tools: ["Claude Code", "Roo Code", "Gemini", "MCP", "Agents and skills", "Hooks"],
  },

  experience: [
    {
      company: "Koud",
      role: "Software Developer",
      // period: "", // TODO
      location: "Remote",
      highlights: [
        "Product development and maintenance within a distributed team, working remotely and autonomously.",
      ],
    },
    {
      company: "Kybel",
      role: "Co-founder · Developer",
      // period: "", // TODO
      highlights: [
        "Own venture built alongside a team of three developers.",
        "Involved at every product stage: scoping, architecture, development and delivery.",
      ],
    },
    {
      company: "Freelance",
      role: "Fullstack · Frontend · Backend Developer",
      // period: "", // TODO
      highlights: [
        "Built web applications for automotive service and spare-parts management, covering inventory, work orders and tracking.",
        "Logistics and invoicing systems for a range of companies.",
        "Mobile applications delivered end to end, from development through release.",
        "Worked across frontend, backend or the full stack depending on what each client needed.",
      ],
    },
    {
      company: "Navojoa City Council",
      role: "Developer · Technical Lead",
      // period: "", // TODO
      highlights: [
        "Built the citizen reporting application and its administrative dashboard for public servants.",
        "Led a small development team building additional applications within the same institution.",
        "Technical coordination: task distribution, code review and team mentoring.",
      ],
    },
  ],

  projects: [
    {
      name: "Citizen Reports — Navojoa",
      tags: ["Mobile", "Admin panel", "Public sector"],
      description:
        "Mobile application that lets residents file reports about issues around the city, paired with an administrative dashboard where public servants track and resolve each case.",
      highlights: [
        "Complete solo project: design, mobile development, backend and web dashboard.",
        "End-to-end flow, from the moment a citizen files a report to the moment the department closes it.",
        "Deployed to real users inside public administration.",
      ],
    },
    {
      name: "Automotive service & spare-parts management",
      tags: ["Web", "Management", "Inventory"],
      description:
        "Web platform for repair shops: spare-parts inventory control, work orders and per-vehicle status tracking.",
      highlights: [
        "Modelled inventory and work orders around a real repair-shop workflow.",
      ],
    },
    {
      name: "Logistics & invoicing",
      tags: ["Web", "Management", "Invoicing"],
      description:
        "Logistics management and invoicing applications built for several companies.",
      highlights: [
        "Automated administrative processes that were previously handled manually.",
      ],
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: ["TypeScript", "JavaScript", "Angular", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "NestJS", "REST APIs", "Authentication & authorization (JWT)"],
    },
    {
      category: "Mobile",
      items: ["Flutter", "Dart"],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "MySQL"],
    },
    {
      category: "Tools & practices",
      items: ["Git", "Docker", "CI/CD", "Agile methodologies", "Technical leadership"],
    },
    {
      category: "AI-assisted development",
      items: ["Claude Code", "Roo Code", "Gemini", "MCP", "Agents", "Skills", "Hooks"],
    },
  ],

  education: [
    {
      institution: "Instituto Tecnológico de Sonora (ITSON) — Navojoa Campus",
      degree: "B.Eng. in Software Engineering",
      // period: "", // TODO
      note: "All software development coursework completed. Currently completing the institutional English and cultural-activity requirements.",
    },
  ],

  ui: {
    sections: {
      about: "Profile",
      experience: "Experience",
      projects: "Selected projects",
      ai: "AI-assisted development",
      skills: "Technical skills",
      education: "Education",
      contact: "Contact",
    },
    downloadPdf: "Download CV as PDF",
    contactMe: "Get in touch",
    allProjects: "All",
    expand: "Show details",
    collapse: "Hide details",
    scrollHint: "Scroll to explore",
    switchLanguage: "View this page in Spanish",
    switchLanguageShort: "ES",
    toggleTheme: "Toggle light and dark theme",
    skipToContent: "Skip to content",
    form: {
      intro:
        "Got a project in mind or a role that fits? Send me a message and I will get back to you.",
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      success: "Message sent — I will get back to you shortly.",
      error: "The message could not be sent. Please email me directly.",
      fallbackIntro: "Got a project in mind or a role that fits?",
      fallbackCta: "Send me an email",
    },
    footer: `${NAME} · Built with Next.js`,
  },
};
