import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://espaciolenguaje.com"),
  title: {
    default: "Espacio Lenguaje — Logopedia Infantil",
    template: "%s | Espacio Lenguaje",
  },
  description:
    "Donde cada peque encuentra su voz. Recursos, ejercicios y acompañamiento profesional en logopedia infantil: estimulación del lenguaje, dislexia y tartamudez.",
  keywords: [
    "logopedia infantil",
    "logopeda",
    "estimulación del lenguaje",
    "dislexia niños",
    "tartamudez infantil",
    "retraso del lenguaje",
    "ejercicios lenguaje niños",
  ],
  authors: [{ name: "Espacio Lenguaje" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://espaciolenguaje.com",
    siteName: "Espacio Lenguaje",
    title: "Espacio Lenguaje — Logopedia Infantil",
    description:
      "Donde cada peque encuentra su voz. Recursos, ejercicios y acompañamiento profesional en logopedia infantil.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Espacio Lenguaje — Logopedia Infantil",
    description:
      "Donde cada peque encuentra su voz. Recursos, ejercicios y acompañamiento profesional en logopedia infantil.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Espacio Lenguaje",
  url: "https://espaciolenguaje.com",
  email: "hola@espaciolenguaje.com",
  description:
    "Logopedia infantil: recursos, ejercicios y acompañamiento profesional para estimulación del lenguaje, dislexia y tartamudez.",
  sameAs: ["https://instagram.com/espaciolenguaje"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
