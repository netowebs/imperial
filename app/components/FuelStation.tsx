"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, Sparkles } from "lucide-react";

type Unit = {
  id: string;
  name: string;
  number: string;
  active: boolean;
  address?: string;
  phone?: string;
  phoneHref?: string;
  hours?: string;
  mapsUrl?: string;
  embedUrl?: string;
  teaser?: string;
};

const units: Unit[] = [
  {
    id: "unidade-1",
    name: "Unidade I",
    number: "01",
    active: true,
    address: "Avenida Justino Vieira, 203 — Vila Rica, Itaí/SP",
    phone: "(14) 9.9640-5590",
    phoneHref: "tel:+5514996405590",
    hours: "Segunda a Domingo — consulte-nos pelo telefone.",
    mapsUrl: "https://maps.app.goo.gl/9XjuN3WBjor8hSCU7",
    embedUrl:
      "https://www.google.com/maps?q=Avenida+Justino+Vieira,+203,+Vila+Rica,+Itaí+-+SP&output=embed",
  },
  {
    id: "unidade-2",
    name: "Unidade II",
    number: "02",
    active: false,
    address: "",
    phone: "",
    phoneHref: "",
    hours: "",
    mapsUrl: "",
    embedUrl: "",
    teaser:
      "A nova unidade já está em construção. Mais estrutura, mais conforto e a mesma qualidade que você conhece. Aguarde novidades!",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function FuelStation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const activeUnit = units[activeIndex];
  const isComingSoon = activeUnit.active === false;

  const changeUnit = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const textVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
  };

  const mapVariants = {
    enter: { opacity: 0, scale: 0.97 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  };

  return (
    <section
      id="station"
      className="py-16 md:py-20 bg-blue-900 dark:bg-black text-white scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-[2px] bg-yellow-400" />
            <span className="text-yellow-400 text-[11px] font-bold uppercase tracking-[0.3em]">
              Onde estamos
            </span>
            <span className="w-8 h-[2px] bg-yellow-400" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Venha nos Visitar
          </h2>
          <p className="text-blue-200/80 max-w-xl mx-auto text-base md:text-lg">
            Duas unidades para melhor atender você.
          </p>
        </div>

        {/* Seletor (abas) */}
        <div className="flex items-end justify-center gap-10 md:gap-16 mb-10 md:mb-12">
          {units.map((unit, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={unit.id}
                onClick={() => changeUnit(index)}
                className="group relative flex flex-col items-center pb-4"
              >
                <span
                  className={`text-[10px] md:text-xs font-bold tracking-[0.3em] mb-2 transition-colors duration-300 ${
                    isActive
                      ? "text-yellow-400"
                      : "text-white/30 group-hover:text-white/60"
                  }`}
                >
                  {unit.number}
                </span>

                <span className="flex items-center gap-2.5">
                  <span
                    className={`text-sm md:text-base font-semibold uppercase tracking-[0.18em] transition-colors duration-300 whitespace-nowrap ${
                      isActive
                        ? "text-white"
                        : "text-white/40 group-hover:text-white/75"
                    }`}
                  >
                    {unit.name}
                  </span>

                  {!unit.active && (
                    <span
                      className={`hidden sm:inline-block text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-[3px] rounded-[3px] border transition-colors ${
                        isActive
                          ? "bg-yellow-400 text-blue-950 border-yellow-400"
                          : "bg-transparent text-yellow-400/70 border-yellow-400/40"
                      }`}
                    >
                      Em breve
                    </span>
                  )}
                </span>

                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/8 overflow-hidden rounded-full">
                  {isActive && (
                    <motion.span
                      layoutId="unit-underline"
                      className="absolute inset-0 bg-yellow-400 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 34,
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
          {/* Texto */}
          <div className="relative min-h-[440px] min-w-0 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeUnit.id}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.55,
                  ease: EASE,
                  opacity: { duration: 0.35, ease: "easeOut" },
                }}
              >
                {!isComingSoon ? (
                  <>
                    <p className="text-yellow-400 text-xs uppercase tracking-[0.28em] font-bold mb-3">
                      Auto Posto Imperial — {activeUnit.name}
                    </p>
                    <p className="text-blue-100/90 mb-8 text-lg leading-relaxed max-w-lg">
                      O Auto Posto Imperial está localizado em um ponto
                      estratégico para melhor atender você. Venha abastecer com
                      a qualidade Ipiranga, tomar um café e cuidar do seu carro.
                    </p>

                    <a
                      href={activeUnit.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-xs uppercase tracking-[0.2em] px-6 py-4 rounded-md shadow-md shadow-yellow-400/20 hover:shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-0.5 transition-all mb-8"
                    >
                      <Navigation
                        size={16}
                        className="fill-blue-950 group-hover:translate-x-0.5 transition-transform"
                      />
                      Iniciar Rota
                      <span className="w-px h-4 bg-blue-950/30 ml-1" />
                      <span className="text-[10px] font-semibold normal-case tracking-normal opacity-80">
                        Google Maps
                      </span>
                    </a>

                    <div className="space-y-6">
                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 rounded-md bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin size={18} className="text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm uppercase tracking-[0.18em] text-white/60 mb-1.5">
                            Endereço
                          </h4>
                          <p className="text-white text-base leading-relaxed">
                            {activeUnit.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 rounded-md bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Clock size={18} className="text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm uppercase tracking-[0.18em] text-white/60 mb-1.5">
                            Horário de Funcionamento
                          </h4>
                          <p className="text-white text-base leading-relaxed">
                            {activeUnit.hours}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 rounded-md bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Phone size={18} className="text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm uppercase tracking-[0.18em] text-white/60 mb-1.5">
                            Telefone
                          </h4>
                          <a
                            href={activeUnit.phoneHref}
                            className="text-white hover:text-yellow-400 text-base transition-colors"
                          >
                            {activeUnit.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center gap-3 mb-6 px-3 py-2 rounded-[3px] border border-yellow-400/40 bg-yellow-400/5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-400" />
                      </span>
                      <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                        Em breve
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                      Algo novo está chegando
                    </h3>
                    <p className="text-yellow-400 text-xs uppercase tracking-[0.28em] font-bold mb-5">
                      Auto Posto Imperial — {activeUnit.name}
                    </p>

                    <p className="text-blue-100/90 mb-8 text-lg leading-relaxed max-w-lg">
                      {activeUnit.teaser}
                    </p>

                    <div className="space-y-6 max-w-md">
                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 rounded-md bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles size={18} className="text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm uppercase tracking-[0.18em] text-white/60 mb-1.5">
                            Novidades
                          </h4>
                          <p className="text-white/80 text-base leading-relaxed">
                            Estrutura ampliada, novos serviços e atendimento de
                            sempre.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 rounded-md bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin size={18} className="text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm uppercase tracking-[0.18em] text-white/60 mb-1.5">
                            Localização
                          </h4>
                          <p className="text-white/80 text-base leading-relaxed">
                            Em breve divulgaremos o endereço da nova unidade.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mapa ou placeholder */}
          <div className="relative h-96 w-full min-w-0">
            <AnimatePresence mode="wait">
              {!isComingSoon ? (
                <motion.div
                  key={activeUnit.id + "-map"}
                  variants={mapVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.55,
                    ease: EASE,
                    delay: 0.08,
                  }}
                  className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10"
                >
                  <iframe
                    src={activeUnit.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Localização da ${activeUnit.name}`}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={activeUnit.id + "-teaser"}
                  variants={mapVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.55,
                    ease: EASE,
                    delay: 0.08,
                  }}
                  className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 flex items-center justify-center"
                >
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  <div className="absolute w-72 h-72 rounded-full bg-yellow-400/20 blur-[100px]" />

                  <div className="relative z-10 text-center px-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-md bg-yellow-400 flex items-center justify-center shadow-2xl shadow-yellow-400/40">
                      <span className="text-blue-950 font-black text-3xl italic leading-none">
                        i
                      </span>
                    </div>
                    <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-[0.35em] mb-3">
                      Em construção
                    </p>
                    <p className="text-white text-2xl font-bold mb-2 tracking-tight">
                      Novidade a caminho
                    </p>
                    <p className="text-blue-200/70 text-sm max-w-xs mx-auto">
                      Estamos preparando cada detalhe para receber você.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}