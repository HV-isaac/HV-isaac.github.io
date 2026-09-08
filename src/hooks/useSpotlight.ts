"use client";

import { useCallback } from "react";

/**
 * Ilumina el borde de una tarjeta siguiendo al puntero.
 *
 * Escribe la posición en variables CSS en lugar de guardarla en estado de React:
 * un `pointermove` dispara decenas de eventos por segundo y volver a renderizar
 * en cada uno tiraría los fotogramas. El pintado lo hace `.spotlight` en CSS.
 */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((event: React.PointerEvent<T>) => {
    const target = event.currentTarget;
    const box = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - box.left}px`);
    target.style.setProperty("--my", `${event.clientY - box.top}px`);
  }, []);
}
