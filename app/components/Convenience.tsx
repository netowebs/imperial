"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Utensils, Wine, IceCream } from "lucide-react";
import Image from "next/image";

const images = [
  {
    src: "/images/conveniencia/conveniencia-1.webp",
    alt: "Prateleira de bebidas geladas",
  },
  {
    src: "/images/conveniencia/conveniencia-2.webp",
    alt: "Balcão de snacks e lanches",
  },
  {
    src: "/images/conveniencia/conveniencia-3.webp",
    alt: "Loja de conveniência do posto",
  },
  {
    src: "/images/conveniencia/conveniencia-4.webp",
    alt: "Produtos variados da conveniência",
  },
];

export function Convenience() {
  return (
    <section
      id="convenience"
      className="py-20 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* ===== Cabeçalho centralizado ===== */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-[2px] bg-yellow-400" />
            <span className="text-yellow-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Dentro do posto
            </span>
            <span className="w-8 h-[2px] bg-yellow-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-4 tracking-tight"
          >
            Nossa Conveniência
          </motion.h2>

          <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full" />
        </div>

        {/* ===== Conteúdo em duas colunas ===== */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 min-w-0 w-full"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
              Muito mais que um posto. A conveniência do Auto Posto Imperial
              oferece uma variedade incrível de produtos, desde snacks e
              bebidas geladas até itens para sua viagem. Tudo com a
              praticidade e rapidez que você precisa.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Utensils, text: "Lanches e Salgados" },
                { icon: Wine, text: "Bebidas Geladas" },
                { icon: IceCream, text: "Sorvetes e Doces" },
                { icon: ShoppingCart, text: "Itens de Viagem" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-md bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-yellow-500" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Imagens */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full min-w-0"
          >
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative w-full h-64 rounded-2xl overflow-hidden shadow-lg ${
                    i === 1 ? "mt-8" : i === 2 ? "-mt-8" : ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}