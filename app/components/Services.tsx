"use client";

import { motion } from "framer-motion";
import { Fuel, Droplets, ShoppingBag } from "lucide-react";

const services = [
  {
    icon: Fuel,
    title: "Abastecimento",
    desc: "Gasolina, Etanol e Diesel com a qualidade e confiança da bandeira Ipiranga.",
    highlight: true,
    badge: "Bandeira Ipiranga",
  },
  {
    icon: Droplets,
    title: "Troca de Óleo",
    desc: "Lubrificantes e filtros de alta performance, com troca rápida e segura.",
    highlight: false,
  },
  {
    icon: ShoppingBag,
    title: "Conveniência",
    desc: "Produtos variados, bebidas geladas e snacks para sua viagem.",
    highlight: false,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border group ${
                service.highlight
                  ? "bg-white dark:bg-gray-900 border-yellow-400/60 ring-1 ring-yellow-400/30"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-yellow-400/40"
              }`}
            >
              {service.badge && (
                <span className="absolute -top-3 left-8 inline-block px-3 py-1 rounded-md bg-yellow-400 text-blue-950 text-[10px] font-bold uppercase tracking-widest">
                  {service.badge}
                </span>
              )}

              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                  service.highlight
                    ? "bg-yellow-400 text-blue-950"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-yellow-400 group-hover:text-blue-900 group-hover:rotate-6"
                }`}
              >
                <service.icon size={28} />
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}