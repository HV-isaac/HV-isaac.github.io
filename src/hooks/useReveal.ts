"use client";

import { useEffect, useRef } from "react";

/**
 * Entrada de los bloques al entrar en pantalla.
 *
 * Un único `IntersectionObserver` compartido por todos los elementos en lugar de
 * uno por componente: la página tiene decenas de bloques y el navegador agrupa
 * mucho mejor las comprobaciones de un solo observador.
 */
let shared: IntersectionObserver | null = null;

function getObserver() {
  if (shared) return shared;

  shared = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.visible = "true";
        // Una sola vez: al volver a subir el bloque ya no se re-anima, que es
        // lo que espera quien relee la página.
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );

  return shared;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = getObserver();
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return ref;
}
