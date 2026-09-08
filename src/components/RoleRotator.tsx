"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Escribe y borra los roles del perfil, uno tras otro.
 *
 * La lista completa va en un `<span>` solo para lectores de pantalla, de forma
 * que se anuncie entera de una vez en lugar de letra a letra; la parte animada
 * queda marcada como decoración.
 */
const TYPE_MS = 55;
const ERASE_MS = 28;
const HOLD_MS = 1700;

type Phase = "typing" | "holding" | "erasing";

interface State {
  index: number;
  length: number;
  phase: Phase;
}

const DELAY: Record<Phase, number> = {
  typing: TYPE_MS,
  holding: HOLD_MS,
  erasing: ERASE_MS,
};

/**
 * Una sola transición por tic. Tener el avance en una función pura, en lugar de
 * repartido en varios `setState` encadenados dentro del efecto, evita los
 * renders en cascada y hace evidente el ciclo completo.
 */
function advance(state: State, roles: string[]): State {
  const current = roles[state.index];

  switch (state.phase) {
    case "typing":
      return state.length < current.length
        ? { ...state, length: state.length + 1 }
        : { ...state, phase: "holding" };
    case "holding":
      return { ...state, phase: "erasing" };
    case "erasing":
      return state.length > 0
        ? { ...state, length: state.length - 1 }
        : { index: (state.index + 1) % roles.length, length: 0, phase: "typing" };
  }
}

export function RoleRotator({ roles }: { roles: string[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<State>({ index: 0, length: 0, phase: "typing" });

  useEffect(() => {
    // Sin movimiento no se programa ningún temporizador: el rol se muestra fijo.
    if (reducedMotion) return;

    const timer = setTimeout(
      () => setState((value) => advance(value, roles)),
      DELAY[state.phase],
    );
    return () => clearTimeout(timer);
  }, [state, roles, reducedMotion]);

  const shown = reducedMotion
    ? roles[0]
    : roles[state.index].slice(0, state.length);

  return (
    <span className="inline-flex items-baseline">
      <span className="sr-only">{roles.join(", ")}</span>
      <span
        aria-hidden="true"
        className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent"
      >
        {shown}
      </span>
      {!reducedMotion && (
        <span
          aria-hidden="true"
          className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-accent"
        />
      )}
    </span>
  );
}
