"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface Post {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: string;
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
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                    >
                      {/* Card top area */}
                      <div className="bg-arena py-12 flex items-center justify-center">
                        <span className="inline-block bg-verde text-white text-xs font-medium px-4 py-1.5 rounded-full">
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
                ))}
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
