"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Utensils, Wine, IceCream } from "lucide-react";
import Image from "next/image";

const images = [
  { src: "/images/conveniencia/conveniencia-1.webp", alt: "Prateleira de bebidas geladas" },
  { src: "/images/conveniencia/conveniencia-2.webp", alt: "Balcão de lanches" },
  { src: "/images/conveniencia/conveniencia-3.webp", alt: "Loja de conveniência do posto" },
  { src: "/images/conveniencia/conveniencia-4.webp", alt: "Produtos variados da conveniência" },
];

export function Convenience() {
  return (
    <section id="convenience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-6">
              Nossa Conveniência
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
              Muito mais que um posto. A conveniência do Auto Posto Imperial oferece uma variedade incrível de produtos, desde lanches, bebidas quentes e geladas até itens para sua viagem. Tudo com a praticidade e rapidez que você precisa.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: Utensils, text: "Lanches e Salgados" },
                { icon: Wine, text: "Bebidas Quentes e Geladas" },
                { icon: IceCream, text: "Sorvetes e Doces" },
                { icon: ShoppingCart, text: "Itens de Viagem" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-yellow-500">
                    <item.icon size={24} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full"
          >
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, i) => (
                <div
                  key={i}
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
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}