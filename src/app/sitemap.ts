import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { products } from "@/lib/products";

const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.espaciolenguaje.com";

  const posts = getAllPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/recursos/${product.id}`,
    lastModified: BUILD_TIME,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: BUILD_TIME,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: BUILD_TIME,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
    {
      url: `${baseUrl}/recursos`,
      lastModified: BUILD_TIME,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productUrls,
    {
      url: `${baseUrl}/recomendaciones`,
      lastModified: BUILD_TIME,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lp/guia-gratis`,
      lastModified: BUILD_TIME,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: BUILD_TIME,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: BUILD_TIME,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: BUILD_TIME,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: BUILD_TIME,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: BUILD_TIME,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
