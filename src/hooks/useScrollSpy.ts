"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección que el lector está viendo, para resaltarla en la
 * navegación lateral.
 *
 * Se apoya en `IntersectionObserver` en lugar de calcular posiciones en cada
 * evento de scroll: no bloquea el hilo principal y el resultado es idéntico.
 */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }

        // Con varias secciones a la vista gana la que ocupa más pantalla; así el
        // indicador no parpadea entre dos al cruzar el límite.
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.3, 0.6, 1] },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
