import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    // Validação básica dos dados
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Nome e mensagem são obrigatórios.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      // Use o domínio que você já verificou no Resend (ex: noreply@autopostoimperial.com.br)
      from: 'Auto Posto Imperial <onboarding@resend.dev>',
      // O e-mail comercial que receberá as mensagens
      to: ['comercial@autopostoimperial.com.br'],
      subject: `Contato do site - ${name}`,
      replyTo: email || undefined, // Permite responder direto para o cliente
      html: `
        <h2>Nova mensagem recebida</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
        <p><strong>E-mail:</strong> ${email || 'Não informado'}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Erro inesperado:', err);
    return NextResponse.json(
      { error: 'Erro interno ao processar a solicitação.' },
      { status: 500 }
    );
  }
}