import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProduct, formatPrice } from "@/lib/products";
import { getProductContent } from "@/lib/products-content";
import BuyButton from "@/app/recursos/BuyButton";
import GuaranteeBadge from "@/components/ui/GuaranteeBadge";
import DownloadLink from "@/components/ui/DownloadLink";

export const metadata: Metadata = {
  title: "Tus 6 fichas están listas",
  robots: { index: false, follow: false },
};

const PDF_PATH = "/downloads/muestra-fichas-articulacion-r-ba5e7821166e.pdf";

export default function GraciasFichasGratisPage() {
  const product = getProduct("fichas-articulacion");
  const content = getProductContent("fichas-articulacion");

  return (
    <div className="pt-24 pb-16">
      {/* Entrega del freebie */}
      <section className="section-padding">
        <div className="container-custom mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-verde/10">
            <svg className="h-10 w-10 text-verde" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="font-serif text-3xl text-cacao md:text-4xl">Tus 6 fichas están listas</h1>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-texto-secundario">
            Descárgalas ahora mismo desde aquí — no hace falta que esperes al email. También te las
            hemos enviado a tu correo por si quieres tenerlas a mano más adelante.
          </p>

          <div className="mt-8">
            <DownloadLink
              href={PDF_PATH}
              recurso="muestra-fichas-r"
              className="inline-flex items-center justify-center rounded-pill bg-terracota px-8 py-4 font-sans font-semibold text-white transition-colors hover:bg-terracota-dark"
            >
              Descargar las 6 fichas (PDF)
            </DownloadLink>
          </div>

          <p className="mt-4 text-sm text-texto-muted">
            ¿No te llega el email? Revisa la carpeta de spam o escríbenos a{" "}
            <a href="mailto:hola@espaciolenguaje.com" className="underline hover:text-terracota">
              hola@espaciolenguaje.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Tripwire — un solo producto */}
      {product && content && (
        <section className="section-padding pt-6">
          <div className="container-custom mx-auto max-w-3xl">
            <div className="rounded-3xl border border-verde/20 bg-white p-6 shadow-sm md:p-9">
              <div className="grid gap-8 md:grid-cols-[minmax(0,220px)_1fr] md:items-start">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl bg-arena/60">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-wide text-terracota">
                    Ya que estás
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-cacao md:text-3xl">{product.name}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-texto-secundario">
                    {content.subtitle}. {product.description}
                  </p>

                  <ul className="mt-5 grid gap-2.5 text-[15px]">
                    {content.whatYouGet.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-verde/15 text-verde-dark">
                          ✓
                        </span>
                        <span className="text-texto-secundario">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <span className="font-serif text-3xl text-cacao">
                      {formatPrice(product.price)}
                    </span>
                    <BuyButton
                      productId={product.id}
                      size="large"
                      label={`Llévate el pack por ${formatPrice(product.price)}`}
                      utmCampaign="tripwire-fichas"
                    />
                  </div>

                  <GuaranteeBadge />

                  <p className="mt-4 text-sm text-texto-muted">
                    ¿Prefieres verlo con calma?{" "}
                    <Link
                      href="/recursos/fichas-articulacion"
                      className="underline hover:text-terracota"
                    >
                      Ficha completa del pack
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
