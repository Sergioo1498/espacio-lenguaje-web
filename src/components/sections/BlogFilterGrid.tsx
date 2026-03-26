"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface Post {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: string;
  image?: string;
}

interface BlogFilterGridProps {
  posts: Post[];
}

const categories = [
  "Todos",
  "Señales de alerta",
  "Ejercicios",
  "Dislexia",
  "Estimulación",
  "Desarrollo del lenguaje",
];

const blogImages: Record<string, { src: string; alt: string }> = {
  "mi-hijo-no-habla-cuando-preocuparse": { src: "/images/blog-mi-hijo-no-habla.png", alt: "Manos de un niño señalando un libro ilustrado" },
  "ejercicios-lenguaje-para-casa": { src: "/images/blog-ejercicios.png", alt: "Mesa con materiales de logopedia y tarjetas" },
  "dislexia-en-ninos-como-detectarla": { src: "/images/blog-dislexia.png", alt: "Letras de madera desordenadas" },
  "estimulacion-del-lenguaje-en-casa": { src: "/images/blog-estimulacion.png", alt: "Manos de padre e hijo con materiales de estimulación del lenguaje" },
  "juegos-para-estimular-el-habla": { src: "/images/blog-juegos-habla.png", alt: "Juegos de logopedia infantil sobre una mesa" },
  "etapas-desarrollo-del-lenguaje": { src: "/images/blog-etapas-desarrollo.png", alt: "Bloques de letras ABC y libro abierto simbolizando etapas del lenguaje" },
  "bilinguismo-infantil-mitos-y-realidades": { src: "/images/blog-bilinguismo.png", alt: "Libros infantiles en dos idiomas con banderitas" },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogFilterGrid({ posts }: BlogFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredPosts =
    activeCategory === "Todos"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <section className="py-8 px-6 md:px-8">
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-terracota text-white"
                    : "border-2 border-cacao/20 text-cacao hover:border-terracota hover:text-terracota"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="section-padding pt-4">
        <div className="container-custom">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, i) => {
                  const img = blogImages[post.slug] || (post.image ? { src: post.image, alt: post.title } : null);
                  return (
                    <motion.div
                      key={post.slug}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, delay: i * 0.1 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group block bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                      >
                        {/* Card image */}
                        <div className="relative h-[200px] overflow-hidden">
                          {img ? (
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-arena flex items-center justify-center">
                              <span className="text-texto-muted text-sm">{post.category}</span>
                            </div>
                          )}
                          <span className="absolute bottom-3 left-4 inline-block rounded-full bg-white/90 backdrop-blur-sm text-verde-dark px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm">
                            {post.category}
                          </span>
                        </div>

                        {/* Card body */}
                        <div className="p-6">
                          <h2 className="font-serif text-xl text-cacao mb-2 group-hover:text-terracota transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-texto-secundario text-sm line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-texto-muted">
                            <time dateTime={post.date}>
                              {formatDate(post.date)}
                            </time>
                            <span>{post.readingTime} de lectura</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-texto-secundario py-16"
              >
                No hay artículos en esta categoría.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
