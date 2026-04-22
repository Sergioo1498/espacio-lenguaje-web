/**
 * Datos del equipo editorial y clínico de Espacio Lenguaje.
 *
 * Nivel 2 de E-E-A-T acordado con Bea (21 abr 2026): credenciales profesionales
 * verificables (colegiada + formación) sin nombre propio ni foto. Ver
 * memoria `project_bea_privacidad.md` y `feedback_rigor_cientifico.md`.
 *
 * El número de colegiada es información pública consultable en el directorio
 * del Colegio Profesional de Logopedas correspondiente.
 *
 * TODO Sergio/Bea: rellenar los campos marcados antes de deploy. Datos
 * necesarios:
 *   - collegeNumber: nº exacto (ej: "28/0457")
 *   - collegeName: nombre oficial del colegio profesional + comunidad
 *   - degrees: lista de titulaciones académicas con universidad y año
 *   - yearsOfExperience: años de práctica clínica (redondeo aceptable)
 *   - specialties: áreas clínicas de trabajo real (no aspiracional)
 *   - sectors: sectores donde ha ejercido (para E-E-A-T geográfico/funcional)
 */

export interface Degree {
  /** Nombre exacto de la titulación */
  title: string;
  /** Institución que la otorga */
  institution: string;
  /** Año de finalización */
  year: number;
}

export interface TeamMember {
  /** Identificador estable (no cambiar — rompe referencias de posts MDX) */
  id: string;
  /** Rol editorial en el proyecto */
  role: "author" | "reviewer" | "author-reviewer";
  /** Alias público. Nivel 2: "Logopeda colegiada del equipo" (sin nombre propio) */
  publicName: string;
  /** jobTitle para schema.org Person */
  jobTitle: string;
  /** Número oficial de colegiación profesional */
  collegeNumber: string;
  /** Nombre del colegio profesional (ej: "Colegio Profesional de Logopedas de Madrid") */
  collegeName: string;
  /** URL oficial del colegio para verificación pública */
  collegeUrl: string;
  /** Titulaciones académicas ordenadas de más a menos recientes */
  degrees: Degree[];
  /** Años de práctica clínica. Omitir si <2 para no penalizar */
  yearsOfExperience?: number;
  /** Áreas clínicas de trabajo (ej: retrasos del lenguaje, dislexia). */
  specialties: string[];
  /** Sectores donde ha ejercido (hospital, CDIAT, colegio, privado) */
  sectors: string[];
  /** Anchor en /sobre-nosotros#<id> — Schema Person @id apunta aquí */
  profileUrl: string;
}

/**
 * Equipo editorial actual. Por ahora 1 persona (Bea) cubre autoría y revisión.
 * Cuando se incorpore más gente, añadir nuevos entries aquí y referenciarlos
 * desde el frontmatter de los MDX (`authorId`, `reviewerId`).
 */
export const team: TeamMember[] = [
  {
    id: "logopeda-principal",
    role: "author-reviewer",
    publicName: "Logopeda colegiada del equipo de Espacio Lenguaje",
    jobTitle: "Logopeda clínica · Autora y revisora editorial",

    // Datos aportados por Bea (22 abr 2026). Años omitidos a petición suya
    // para minimizar exposición pública; la lógica del componente oculta
    // automáticamente todo lo que tenga year=0.
    collegeNumber: "461825",
    collegeName: "Colegio Profesional de Logopedas de la Comunitat Valenciana",
    collegeUrl: "https://colegiologopedas-cv.org/",

    degrees: [
      {
        title: "Máster en Intervención Logopédica Especializada en Atención Temprana",
        institution: "Universidad Católica de Valencia",
        year: 0, // omitido a petición de Bea
      },
      {
        title: "Grado en Logopedia",
        institution: "Universidad de Valencia",
        year: 0, // omitido a petición de Bea
      },
    ],

    // yearsOfExperience omitido a petición de Bea
    specialties: [
      "Atención temprana (0-6 años)",
      "Retrasos del lenguaje",
      "Estimulación del lenguaje en contextos familiares",
    ],
    sectors: ["CDIAT (Centro de Desarrollo Infantil y Atención Temprana)"],

    profileUrl: "https://www.espaciolenguaje.com/sobre-nosotros#logopeda-principal",
  },
];

/** Busca un miembro por id. Si no existe, devuelve el principal como fallback seguro. */
export function getTeamMember(id?: string): TeamMember {
  if (!id) return team[0];
  return team.find((m) => m.id === id) ?? team[0];
}

/** Autor por defecto para posts que no especifican authorId en el frontmatter */
export function defaultAuthor(): TeamMember {
  return team[0];
}

/** Revisor por defecto para posts YMYL que no especifican reviewerId */
export function defaultReviewer(): TeamMember {
  return team[0];
}

/**
 * Devuelve true si faltan datos CRÍTICOS (no los omitidos intencionalmente).
 * Los años en 0 se consideran omisión deliberada por privacidad, no error.
 * Úsalo en scripts de build para bloquear deploy si faltan datos verificables.
 */
export function hasPendingCredentials(member: TeamMember = team[0]): boolean {
  return (
    member.collegeNumber === "PENDIENTE" ||
    member.collegeUrl.includes("example.com") ||
    member.degrees.some((d) => d.institution.includes("[X]"))
  );
}
