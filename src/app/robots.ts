import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/descargar-guia",
          "/compra-exitosa",
          "/llms.txt",
          "/llms-full.txt",
        ],
      },
      // Permitir explícitamente Google-Extended (AI Overviews → tráfico de retorno)
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Buscadores/asistentes de IA: PERMITIDOS. Citan la fuente y devuelven
      // tráfico, igual que Google-Extended → AI Overviews.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      // Scrapers puros de entrenamiento sin atribución: BLOQUEADOS.
      // (contenido revisado clínicamente: protegemos el rigor que aporta Bea)
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
    ],
    sitemap: "https://www.espaciolenguaje.com/sitemap.xml",
  };
}
