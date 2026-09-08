/**
 * Retardo escalonado de entrada, con tope para que el último elemento de una
 * lista larga no se haga esperar.
 *
 * Vive fuera de los componentes cliente a propósito: los componentes de
 * servidor también lo usan al pasar el retardo como prop, y una función
 * exportada desde un módulo `"use client"` no se puede invocar desde el
 * servidor.
 */
export function stagger(index: number) {
  return Math.min(index * 70, 280);
}
