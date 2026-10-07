/**
 * Enlace que abre un chat de WhatsApp con el mensaje ya escrito.
 *
 * `wa.me` quiere el número solo con dígitos: con lada de país y sin «+»,
 * espacios ni guiones. Se parte del mismo `profile.phone` que se muestra, para
 * que el número visible y el del enlace no puedan separarse.
 */
export function whatsappUrl(phone: string, message: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
