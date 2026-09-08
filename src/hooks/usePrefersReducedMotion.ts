"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// En el prerender no hay `matchMedia`. Se asume que sí hay movimiento porque el
// CSS ya apaga las animaciones por su cuenta; esto solo cubre lo que se anima
// desde JavaScript.
const getServerSnapshot = () => false;

/**
 * Preferencia de movimiento reducido del sistema, reactiva.
 *
 * Necesaria además de la regla CSS: hay animación que se produce escribiendo
 * texto desde JavaScript, y eso el CSS no puede detenerlo.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
