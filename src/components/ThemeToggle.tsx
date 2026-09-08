"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * El tema vive en el DOM (la clase `.dark` en <html>), no en estado de React:
 * lo fija un script inline antes de hidratar para evitar el parpadeo al cargar.
 *
 * Por eso el botón lo *lee* del DOM con `useSyncExternalStore` en lugar de
 * duplicarlo en un `useState`. Así el icono no puede desincronizarse de lo que
 * se ve, venga el cambio de donde venga.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const isDarkNow = () => document.documentElement.classList.contains("dark");

// Durante el prerender no hay DOM y el tema es desconocido: `null` hace que se
// reserve el hueco del botón sin dibujar todavía el icono equivocado.
const unknownOnServer = () => null;

export function ThemeToggle({ label }: { label: string }) {
  const dark = useSyncExternalStore(subscribe, isDarkNow, unknownOnServer);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Modo privado o almacenamiento bloqueado: el tema simplemente no persiste.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {dark === null ? null : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {dark ? (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </>
          )}
        </svg>
      )}
    </button>
  );
}
