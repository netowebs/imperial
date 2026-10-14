"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useIsOpen } from "../hooks/useIsOpen";

export function Hero() {
  const isOpen = useIsOpen();

  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/posto-bg.webp"
          alt="Fachada do Auto Posto Imperial"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-blue-900/40 dark:from-black/95 dark:via-black/80 dark:to-black/50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 w-full py-28">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-white mb-6"
          >
            Qualidade que
            <br />
            <span className="text-yellow-400">move você</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-xl mb-10 leading-relaxed"
          >
            Combustível Ipiranga, conveniência completa e troca de óleo no
            mesmo lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#services"
              className="group inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-sm md:text-base uppercase tracking-wider px-8 py-4 rounded-md shadow-lg shadow-yellow-400/20 transition-all hover:shadow-xl hover:shadow-yellow-400/30 hover:-translate-y-0.5"
            >
              Nossos Serviços
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#station"
              className="group inline-flex items-center gap-3 border border-white/40 hover:border-white text-white font-semibold text-sm md:text-base uppercase tracking-wider px-8 py-4 rounded-md backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all"
            >
              <MapPin size={18} />
              Como Chegar
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-14 pt-8 border-t border-white/15"
          >
            {/* Status aberto/fechado */}
            {isOpen !== null && (
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOpen
                      ? "bg-green-400 animate-pulse"
                      : "bg-gray-400"
                  }`}
                />
                <span className="text-white/80 text-sm font-medium">
                  {isOpen ? "Aberto agora" : "Fechado Agora"}
                </span>
              </div>
            )}

            <div className="text-white/80 text-sm font-medium">
              Combustível • Conveniência • Troca de Óleo
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}