import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

// ===== Rate limit em memória =====
// Limite: 3 envios por hora por IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hora

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true };
}

// Limpa entradas antigas a cada 10 minutos (evita memory leak)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 10 * 60 * 1000);

// ===== Sanitização =====
// Remove caracteres de controle (incluindo CR/LF usados em header injection)
function stripControlChars(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

// Escapa HTML para evitar injeção no corpo do e-mail
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ===== Schema de validação =====
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome muito curto.")
    .max(100, "Nome muito longo."),
  phone: z
    .string()
    .trim()
    .max(20, "Telefone muito longo.")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("E-mail inválido.")
    .max(150, "E-mail muito longo.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(5, "Mensagem muito curta.")
    .max(2000, "Mensagem muito longa."),
  // Honeypot: deve vir vazio. Se vier preenchido, é bot.
  website: z.string().max(0, "Bot detectado.").optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Configuração de e-mail ausente no servidor." },
        { status: 500 }
      );
    }

    // ===== Rate limit por IP =====
    const forwarded = request.headers.get("x-forwarded-for");
    const ip =
      forwarded?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Muitas solicitações. Tente novamente em ${Math.ceil(
            (rate.retryAfter || 0) / 60
          )} minutos.`,
        },
        { status: 429 }
      );
    }

    // ===== Parse + validação =====
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Dados inválidos.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, phone, email, message, website } = parsed.data;

    // ===== Honeypot =====
    // Se o campo invisível veio preenchido, é bot.
    if (website && website.length > 0) {
      // Retorna sucesso falso para não dar dica ao bot
      return NextResponse.json({ success: true });
    }

    // ===== Sanitização =====
    const cleanName = escapeHtml(stripControlChars(name));
    const cleanPhone = phone ? escapeHtml(stripControlChars(phone)) : "";
    const cleanEmail = email ? stripControlChars(email) : "";
    const cleanMessage = escapeHtml(stripControlChars(message)).replace(
      /\n/g,
      "<br />"
    );

    // ===== Envio =====
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Auto Posto Imperial <contato@autopostoimperial.com.br>",
      to: ["comercial@autopostoimperial.com.br"],
      subject: `Novo contato do site - ${cleanName}`,
      replyTo: cleanEmail || undefined,
      html: `
        <h2>Nova mensagem recebida</h2>
        <p><strong>Nome:</strong> ${cleanName}</p>
        <p><strong>Telefone:</strong> ${cleanPhone || "Não informado"}</p>
        <p><strong>E-mail:</strong> ${cleanEmail || "Não informado"}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${cleanMessage}</p>
      `,
    });

    if (error) {
      console.error("Erro ao enviar e-mail:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return NextResponse.json(
      { error: "Erro interno ao processar a solicitação." },
      { status: 500 }
    );
  }
}