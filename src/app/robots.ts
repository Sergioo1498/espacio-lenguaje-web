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
      // Bloquear scrapers de entrenamiento LLM sin atribución
      // (contenido revisado clínicamente: protegemos el rigor que aporta Bea)
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "OAI-SearchBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "PerplexityBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
    ],
    sitemap: "https://www.espaciolenguaje.com/sitemap.xml",
  };
}
