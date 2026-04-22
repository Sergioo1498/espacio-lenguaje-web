import Link from "next/link";
import { type TeamMember, defaultAuthor, defaultReviewer, getTeamMember } from "@/lib/team";

interface AuthorBoxProps {
  /** Id opcional del autor del post (del frontmatter). Si no, default. */
  authorId?: string;
  /** Id opcional del revisor. Si no, default. */
  reviewerId?: string;
  /** Fecha de publicación del post (ISO string) */
  publishedAt: string;
  /** Fecha de última revisión (ISO string). Si no se pasa, usa publishedAt. */
  reviewedAt?: string;
}

function formatSpanishDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function CredentialSummary({ member }: { member: TeamMember }) {
  const mainDegree = member.degrees[0];
  return (
    <p className="text-sm text-texto-secundario leading-relaxed">
      {member.jobTitle}.
      {member.collegeName && (
        <>
          {" "}
          Colegiada en el{" "}
          <a
            href={member.collegeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-terracota"
          >
            {member.collegeName}
          </a>
          .
        </>
      )}
      {mainDegree && !mainDegree.institution.includes("[X]") && (
        <>
          {" "}
          {mainDegree.title} ({mainDegree.institution}
          {mainDegree.year > 0 && `, ${mainDegree.year}`}).
        </>
      )}
    </p>
  );
}

export default function AuthorBox({
  authorId,
  reviewerId,
  publishedAt,
  reviewedAt,
}: AuthorBoxProps) {
  const author = authorId ? getTeamMember(authorId) : defaultAuthor();
  const reviewer = reviewerId ? getTeamMember(reviewerId) : defaultReviewer();
  const sameRole = author.id === reviewer.id;

  return (
    <aside
      className="mt-12 border-t border-cacao/10 pt-8"
      aria-label="Información editorial del artículo"
    >
      <div className="rounded-2xl bg-arena/60 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-terracota/10 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 12a4 4 0 100-8 4 4 0 000 8z"
                stroke="#C4745A"
                strokeWidth="1.8"
              />
              <path
                d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
                stroke="#C4745A"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-lg text-cacao mb-1">
              Revisión profesional
            </h2>
            <p className="text-sm font-medium text-cacao mb-3">
              {sameRole ? "Escrito y revisado por" : "Escrito por"}{" "}
              <Link href={author.profileUrl} className="underline hover:text-terracota">
                {author.publicName}
              </Link>
              {!sameRole && (
                <>
                  {" "}· Revisado por{" "}
                  <Link href={reviewer.profileUrl} className="underline hover:text-terracota">
                    {reviewer.publicName}
                  </Link>
                </>
              )}
              .
            </p>
            <CredentialSummary member={author} />

            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-texto-muted">
              <div>
                <dt className="inline font-medium text-cacao/70">Publicado: </dt>
                <dd className="inline">{formatSpanishDate(publishedAt)}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-cacao/70">Última revisión: </dt>
                <dd className="inline">
                  {formatSpanishDate(reviewedAt ?? publishedAt)}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-texto-muted">
              Este contenido sigue nuestra{" "}
              <Link href="/sobre-nosotros#metodologia" className="underline hover:text-terracota">
                metodología editorial
              </Link>
              {" "}basada en guías clínicas oficiales (GAT, AEP, DSM-5) y literatura
              especializada. Si encuentras algo que pueda mejorarse,{" "}
              <Link href="/contacto" className="underline hover:text-terracota">
                cuéntanoslo
              </Link>
              .
            </p>

            <p className="mt-3 text-xs text-texto-muted italic border-t border-cacao/5 pt-3">
              Aviso: este artículo es material divulgativo de orientación para
              familias. <strong className="not-italic">No sustituye la valoración clínica individual</strong> de
              un logopeda colegiado, y ninguna afirmación debe usarse para
              diagnosticar ni tratar casos concretos. Si tu hijo o hija
              presenta dificultades específicas, consulta con una profesional
              de tu localidad.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
