// Fuente compartida de las fichas de articulación: rutas, pictogramas y parseo del MD.
// Existe porque el pack v3 y la muestra gratuita tenían dos copias del mismo parser
// y una de ellas se quedó con un bug (ver getFichaData más abajo).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..");
export const PREVIEW = path.join(ROOT, "private", "productos", "_preview");
export const ASSETS_DIR = path.join(PREVIEW, "assets", "arasaac");
export const FICHAS_JSON = path.join(PREVIEW, "fichas-with-pictos.json");
export const SOURCE_MD = path.join(PREVIEW, "pack-fichas-articulacion-content.md");

export function loadFichas() {
  return JSON.parse(fs.readFileSync(FICHAS_JSON, "utf8"));
}

export function loadSourceMd() {
  return fs.readFileSync(SOURCE_MD, "utf8");
}

/** Imagen del pictograma → data URI, para que el PDF no dependa de ficheros externos. */
export function pictoUri(filename) {
  if (!filename) return null;
  const p = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(p)) return null;
  return `data:image/png;base64,${fs.readFileSync(p).toString("base64")}`;
}

/**
 * Extrae del markdown los campos que no vienen en el JSON de pictogramas.
 *
 * OJO con el flag del regex: la versión que generó el pack v3 llevaba "m", y con /m
 * el `$` de la alternativa `(?=## Ficha |$)` casa al final de CADA línea, así que la
 * captura perezosa se cortaba en el titular (46 caracteres en vez de ~430) y los tres
 * campos salían vacíos en las 30 fichas del PDF que se vende. Sin el flag, `$` es el
 * final del documento y la sección se captura entera.
 */
export function getFichaData(sourceMd, num) {
  const m = sourceMd.match(new RegExp(`## Ficha ${num}[\\s\\S]*?(?=## Ficha |$)`));
  if (!m) return {};
  const sec = m[0];
  return {
    edad: sec.match(/Edad esperada de adquisición\*?\*?:\s*([^\n]+)/)?.[1]?.trim(),
    posicion: sec.match(/Posición articulatoria\*?\*?:\s*([^\n]+)/)?.[1]?.trim(),
    silabario: sec.match(/Silabario\*?\*?:\s*([^\n]+)/)?.[1]?.trim(),
    emoji: sec.match(/Emoji\*?\*?:\s*([^\n]+)/)?.[1]?.trim(),
  };
}
