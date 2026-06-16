/**
 * Genera el mapa de hreflang para indicar a Google que el contenido
 * sirve a múltiples mercados hispanohablantes (ES + LatAm) sin duplicar
 * contenido. Cada locale apunta a la misma URL.
 *
 * Países objetivo: España, México, Argentina, Colombia, Chile, Perú,
 * Uruguay, Venezuela. Cubre ~90% del mercado hispanohablante.
 */
export const LOCALES = [
  "es-ES", // España (mercado primario)
  "es-MX", // México (mercado #1 LatAm por volumen)
  "es-AR", // Argentina
  "es-CO", // Colombia
  "es-CL", // Chile
  "es-PE", // Perú
  "es-UY", // Uruguay
  "es-VE", // Venezuela
  "es", // fallback genérico para cualquier hispanohablante
];

const BASE_URL = "https://www.espaciolenguaje.com";

/**
 * Devuelve el objeto `languages` para metadata.alternates de Next.js.
 * Path debe empezar por "/" (ej: "/blog/mi-post" o "/" para home).
 * Cada hreflang apunta a la misma URL — Google entiende esto como
 * "este contenido sirve para todos esos mercados".
 */
export function localizedAlternates(path: string): Record<string, string> {
  const url = `${BASE_URL}${path === "/" ? "" : path}`;
  const map: Record<string, string> = {};
  for (const locale of LOCALES) {
    map[locale] = url;
  }
  // x-default es el fallback que Google usa cuando no matchea ningún locale.
  map["x-default"] = url;
  return map;
}
