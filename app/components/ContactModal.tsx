"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { IMaskInput } from "react-imask";
import { useContactModal } from "./contexts/ContactModalContext";

type Status = "idle" | "sending" | "success" | "error";

export function ContactModal() {
  const { isOpen, close } = useContactModal();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot — deve permanecer sempre vazio
  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "sending") close();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, status]);

  // Reset ao fechar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setWebsite("");
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message, website }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar mensagem.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro inesperado. Tente novamente."
      );
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      (name ? `Olá! Meu nome é ${name}.\n\n` : "Olá!\n\n") +
        (phone ? `Telefone: ${phone}\n` : "") +
        (email ? `E-mail: ${email}\n` : "") +
        (message ? `\n${message}` : "")
    );
    window.open(`https://wa.me/5514996405590?text=${text}`, "_blank");
    close();
  };

  const isSending = status === "sending";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => !isSending && close()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white dark:bg-gray-950 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-blue-950 dark:bg-black px-6 py-5 flex items-start justify-between shrink-0">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Fale Conosco
                </h3>
                <p className="text-blue-200/80 text-sm mt-1">
                  Envie sua mensagem e responderemos o quanto antes.
                </p>
              </div>
              <button
                onClick={close}
                disabled={isSending}
                aria-label="Fechar"
                className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <X size={22} />
              </button>
            </div>

            {/* ===== SUCCESS ===== */}
            {status === "success" ? (
              <div className="p-8 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-5"
                >
                  <CheckCircle size={32} className="text-green-500" />
                </motion.div>

                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Mensagem enviada!
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 max-w-sm">
                  Obrigado pelo contato. Nossa equipe responderá o mais breve
                  possível.
                </p>

                <button
                  onClick={close}
                  className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-md shadow-md shadow-yellow-400/20 hover:shadow-lg transition-all cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            ) : (
              /* ===== FORM ===== */
              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-5 overflow-y-auto"
              >
                {/* Honeypot — invisível para humanos, visível para bots */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website">Não preencha este campo</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {/* Erro geral */}
                {status === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-3 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50"
                  >
                    <AlertCircle
                      size={16}
                      className="text-red-500 shrink-0 mt-0.5"
                    />
                    <p className="text-red-600 dark:text-red-400 text-xs leading-relaxed">
                      {errorMessage}
                    </p>
                  </motion.div>
                )}

                {/* Nome */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSending}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors disabled:opacity-60"
                  />
                </div>

                {/* Telefone / E-mail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 mb-2">
                      Telefone
                    </label>
                    <IMaskInput
                      mask="(00) 00000-0000"
                      unmask={false}
                      value={phone}
                      disabled={isSending}
                      onAccept={(value: string) => setPhone(value)}
                      placeholder="(00) 00000-0000"
                      inputMode="tel"
                      className="w-full px-4 py-3 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      disabled={isSending}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Mensagem */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    required
                    disabled={isSending}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Como podemos ajudar?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors resize-none disabled:opacity-60"
                  />
                </div>

                {/* Enviar */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="group w-full inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-xs uppercase tracking-[0.2em] px-6 py-4 rounded-md shadow-md shadow-yellow-400/20 hover:shadow-lg hover:shadow-yellow-400/30 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-yellow-400"
                >
                  {isSending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar Mensagem
                    </>
                  )}
                </button>

                {/* Divisor */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200 dark:border-gray-800" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white dark:bg-gray-950 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      ou
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  disabled={isSending}
                  className="group w-full inline-flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-800 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950/20 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-bold text-xs uppercase tracking-[0.2em] px-6 py-4 rounded-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MessageCircle size={16} />
                  Falar no WhatsApp
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}