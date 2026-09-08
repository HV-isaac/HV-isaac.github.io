"use client";

import { SECTION_IDS, type SectionId } from "@/lib/sections";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const IDS = [...SECTION_IDS];

/**
 * Índice lateral que resalta la sección en pantalla.
 *
 * Es una lista de enlaces normales: sin JavaScript sigue navegando por anclas y
 * lo único que se pierde es el resaltado.
 */
export function SideNav({ titles }: { titles: Record<SectionId, string> }) {
  const active = useScrollSpy(IDS);

  return (
    <nav aria-label={titles.perfil} className="hidden lg:block">
      <ul className="space-y-1">
        {SECTION_IDS.map((id) => {
          const current = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={current ? "true" : undefined}
                className="group flex items-center gap-4 py-2"
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ${
                    current
                      ? "w-14 bg-accent"
                      : "w-7 bg-border group-hover:w-14 group-hover:bg-muted"
                  }`}
                />
                <span
                  className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                    current ? "text-fg" : "text-muted group-hover:text-fg"
                  }`}
                >
                  {titles[id]}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
