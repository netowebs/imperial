"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Home, Wrench, Fuel, Mail, Lock } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useContactModal } from "./contexts/ContactModalContext";

function InstagramIcon({
  size = 13,
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

function BeerMugIcon({
  size = 20,
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
      <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
      <path d="M9 12v6" />
      <path d="M13 12v6" />
      <path d="M14 7H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
      <path d="M8 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { open: openContact } = useContactModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["home", "services", "convenience", "station"];
      const scrollPos = window.scrollY + 140;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#home", id: "home", icon: Home },
    { name: "Serviços", href: "#services", id: "services", icon: Wrench },
    {
      name: "Conveniência",
      href: "#convenience",
      id: "convenience",
      icon: BeerMugIcon,
    },
    { name: "Posto", href: "#station", id: "station", icon: Fuel },
  ];

  const WEBMAIL_URL = "https://webmail.autopostoimperial.com.br";

  return (
    <header className="fixed top-0 w-full z-50">
      {/* ===== Faixa superior institucional ===== */}
      <div
        className={`hidden md:block bg-blue-950 dark:bg-black transition-all duration-300 overflow-hidden ${
          scrolled ? "h-0 opacity-0" : "h-9 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-end text-xs text-blue-100/80 tracking-wide">
          <div className="flex items-center gap-6">
            <a
              href="tel:+5514996405590"
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <Phone size={13} className="text-yellow-400" />
              (14) 9.9640-5590
            </a>
            <a
              href="https://instagram.com/imperialautopostoitai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <InstagramIcon size={13} className="text-yellow-400" />
              @imperialautopostoitai
            </a>
          </div>
        </div>
      </div>

      {/* ===== Header principal ===== */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-white/98 dark:bg-gray-950/98 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_8px_24px_-12px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-black/50 via-black/20 to-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-500 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3.5 group shrink-0">
            <div
              className={`relative flex items-center justify-center transition-all duration-500 ${
                scrolled ? "w-10 h-10" : "w-11 h-11"
              } bg-yellow-400 rounded-[10px] shadow-[0_4px_14px_-2px_rgba(250,204,21,0.5)] group-hover:shadow-[0_6px_20px_-2px_rgba(250,204,21,0.7)] group-hover:-translate-y-0.5`}
            >
              <span className="text-blue-950 font-black text-xl leading-none italic">
                i
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-bold text-base md:text-[17px] tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-blue-950 dark:text-white" : "text-white"
                }`}
              >
                Auto Posto Imperial
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.28em] font-semibold mt-1 transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-500 dark:text-gray-500"
                    : "text-white/70"
                }`}
              >
                Desde 2020
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 rounded-sm ${
                    scrolled
                      ? isActive
                        ? "text-blue-950 dark:text-yellow-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-950 dark:hover:text-white"
                      : isActive
                      ? "text-yellow-400"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] rounded-full bg-yellow-400 transition-all duration-300 ${
                      isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              );
            })}

            <button
              onClick={openContact}
              className={`relative px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 rounded-sm cursor-pointer ${
                scrolled
                  ? "text-gray-600 dark:text-gray-400 hover:text-blue-950 dark:hover:text-white"
                  : "text-white/85 hover:text-white"
              }`}
            >
              Fale Conosco
            </button>

            {/* Webmail */}
            <a
              href={WEBMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-md text-[12px] font-bold uppercase tracking-[0.14em] border transition-all duration-200 ${
                scrolled
                  ? "border-blue-950/20 dark:border-yellow-400/30 text-blue-950 dark:text-yellow-400 hover:bg-blue-950 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-blue-950"
                  : "border-white/30 text-white hover:bg-yellow-400 hover:text-blue-950 hover:border-yellow-400"
              }`}
            >
              <Lock size={13} />
              Webmail
            </a>

            <div
              className={`ml-4 pl-4 border-l transition-colors duration-300 ${
                scrolled
                  ? "border-gray-300/70 dark:border-gray-700/70"
                  : "border-white/20"
              }`}
            >
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menu"
              className={`p-2 rounded-md transition-colors duration-200 ${
                scrolled
                  ? "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-4 py-4 flex flex-col gap-1 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-md text-[13px] font-semibold uppercase tracking-[0.12em] transition-all ${
                  isActive
                    ? "bg-yellow-400/10 text-blue-950 dark:text-yellow-400 border-l-2 border-yellow-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 border-l-2 border-transparent"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-md transition-colors ${
                    isActive
                      ? "bg-yellow-400 text-blue-950"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 group-hover:bg-yellow-400 group-hover:text-blue-950"
                  }`}
                >
                  <Icon size={17} />
                </span>
                {link.name}
              </a>
            );
          })}

          <button
            onClick={() => {
              setIsOpen(false);
              openContact();
            }}
            className="group flex items-center gap-4 px-4 py-3.5 rounded-md text-[13px] font-semibold uppercase tracking-[0.12em] transition-all text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 border-l-2 border-transparent cursor-pointer text-left"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-md transition-colors bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 group-hover:bg-yellow-400 group-hover:text-blue-950">
              <Mail size={17} />
            </span>
            Fale Conosco
          </button>

          <a
            href={WEBMAIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-4 px-4 py-3.5 rounded-md text-[13px] font-semibold uppercase tracking-[0.12em] transition-all text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 border-l-2 border-transparent"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-md transition-colors bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 group-hover:bg-yellow-400 group-hover:text-blue-950">
              <Lock size={16} />
            </span>
            Webmail
          </a>
        </nav>
      </div>
    </header>
  );
}