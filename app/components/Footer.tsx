"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { useContactModal } from "./contexts/ContactModalContext";

function InstagramIcon({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const { open: openContact } = useContactModal();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Coluna 1: Marca */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-blue-900 font-black text-xl leading-none italic">
                  i
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg text-blue-400">
                  Auto Posto Imperial
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mt-1">
                  Desde 2020
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Combustível de qualidade, conveniência completa e troca de óleo no
              mesmo lugar.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400">
              Links Rápidos
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#convenience"
                  className="hover:text-white transition-colors"
                >
                  Conveniência
                </a>
              </li>
              <li>
                <a
                  href="#station"
                  className="hover:text-white transition-colors"
                >
                  Localização
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400">Contato</h4>
            <ul className="space-y-3 text-gray-400 text-sm mb-5">
              <li className="flex items-start justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                <span>
                  Avenida Justino Vieira, 203
                  <br />
                  Vila Rica - Itaí/SP
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-yellow-400 shrink-0" />
                <a
                  href="tel:+5514996405590"
                  className="hover:text-white transition-colors"
                >
                  (14) 9.9640-5590
                </a>
              </li>
            </ul>

            <button
              onClick={openContact}
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-xs uppercase tracking-[0.15em] px-5 py-3 rounded-md shadow-md shadow-yellow-400/20 hover:shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle size={16} />
              Fale Conosco
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {currentYear} Auto Posto Imperial. Todos os direitos
          reservados.
        </div>

        {/* Assinatura de desenvolvimento */}
        <div className="mt-6 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gray-500 font-semibold">
            Desenvolvido por
          </span>

          <a
            href="https://instagram.com/advantagelab_br"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            {/* Logo */}
            <div className="h-7 w-auto flex items-center">
              <img
                src="/images/advantage-lab.png"
                alt="Advantage Lab"
                className="h-6 w-auto object-contain"
              />
            </div>

            {/* Nome + Instagram */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">
                Advantage Lab
              </span>
              <span className="text-gray-600 text-xs">·</span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500 group-hover:text-yellow-400 transition-colors">
                <InstagramIcon size={12} />
                @advantagelab_br
              </span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}