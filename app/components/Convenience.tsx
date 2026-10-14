"use client";

import { motion } from "framer-motion";
import {
  Utensils,
  Wine,
  IceCream,
  Coffee,
  Sandwich,
  Martini,
  CarFront,
} from "lucide-react";
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

const features = [
  { icon: Sandwich, text: "Lanches e Salgados" },
  { icon: Utensils, text: "Porções" },
  { icon: Coffee, text: "Café Expresso" },
  { icon: Wine, text: "Bebidas Geladas" },
  { icon: Martini, text: "Drinks" },
  { icon: IceCream, text: "Sorvetes e Doces" },
];

export function Convenience() {
  return (
    <section
      id="convenience"
      className="py-20 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Cabeçalho centralizado */}
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

        {/* Conteúdo em duas colunas */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 min-w-0 w-full flex flex-col"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed">
              Muito mais que um posto. Do café da manhã ao happy hour, a
              conveniência do Auto Posto Imperial tem tudo o que você precisa
              para uma pausa completa. Lanches preparados na hora, porções para
              compartilhar, bebidas geladas e um café expresso de verdade.
            </p>

            {/* Grid de features — 2 colunas em todo tamanho */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-5 sm:gap-y-6 mb-7">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-yellow-400/10 border border-yellow-400/25 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-yellow-400 group-hover:border-yellow-400">
                    <item.icon
                      size={18}
                      className="text-yellow-500 transition-colors duration-300 group-hover:text-blue-950"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-[13px] sm:text-sm md:text-[15px] leading-tight">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Divisor decorativo */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 mb-8 origin-left"
            >
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-gray-300 dark:to-gray-700" />
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-yellow-400/50 bg-white dark:bg-gray-900">
                <CarFront size={15} className="text-yellow-500" />
              </span>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 dark:via-gray-700 to-gray-300 dark:to-gray-700" />
            </motion.div>

            {/* Texto convite */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
            >
              Venha conhecer a nossa conveniência! Um espaço familiar e
              aconchegante, onde você encontra tudo o que precisa para uma
              refeição completa. Seja para comer no local ou para viagem,
              temos o ambiente perfeito para você e sua família
              recarregarem as energias. Te esperamos!
            </motion.p>
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
                  className={`relative w-full h-60 rounded-2xl overflow-hidden shadow-lg ${
                    i === 1 ? "mt-6" : i === 2 ? "-mt-6" : ""
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