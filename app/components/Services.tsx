"use client";

import { motion } from "framer-motion";
import { Fuel, Droplets, ShoppingBag } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: Fuel,
    title: "Abastecimento",
    desc: "Gasolina, Etanol e Diesel com a qualidade e confiança da bandeira Ipiranga.",
    highlight: true,
    image: "/images/servicos/abastecimento.webp",
    position: "object-center",
  },
  {
    icon: Droplets,
    title: "Troca de Óleo",
    desc: "Lubrificantes e filtros de alta performance, com troca rápida e segura.",
    highlight: false,
    image: "/images/servicos/troca-oleo.webp",
    position: "object-center",
  },
  {
    icon: ShoppingBag,
    title: "Conveniência",
    desc: "Produtos variados, bebidas geladas e snacks para sua viagem.",
    highlight: false,
    image: "/images/servicos/conveniencia.webp",
    position: "object-top-right",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Cabeçalho */}
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
              O que oferecemos
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
            Nossos Serviços
          </motion.h2>

          <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[400px] md:h-[460px] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Imagem de fundo */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-cover ${service.position} transition-transform duration-700 group-hover:scale-105`}
              />

              {/* Scrim inferior mais alto e mais forte */}
              <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black/95 via-black/70 via-40% to-transparent z-[1]" />

              {/* Ícone no topo */}
              <div
                className={`absolute top-5 left-5 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 z-10 ${
                  service.highlight
                    ? "bg-yellow-400 text-blue-950"
                    : "bg-white/95 backdrop-blur-sm text-blue-900 group-hover:bg-yellow-400 group-hover:text-blue-950"
                }`}
              >
                <service.icon
                  size={26}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Texto sobre a imagem */}
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 z-10">
                <h3
                  className="text-2xl md:text-[28px] font-extrabold text-white mb-3 tracking-tight leading-[1.15]"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)",
                  }}
                >
                  {service.title}
                </h3>

                {/* Linha amarela como sublinhado do título */}
                <span className="block w-12 h-[3px] bg-yellow-400 rounded-full mb-4" />

                <p
                  className="text-white/95 leading-relaxed text-sm md:text-base font-medium"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
                >
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}