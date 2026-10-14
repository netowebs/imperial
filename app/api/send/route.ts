import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Configuração de e-mail ausente no servidor.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Nome e mensagem são obrigatórios.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Auto Posto Imperial <contato@autopostoimperial.com.br>',
      to: ['comercial@autopostoimperial.com.br'],
      subject: `Novo contato do site - ${name}`,
      replyTo: email || undefined,
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