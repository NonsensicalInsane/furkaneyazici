import type { APIRoute } from 'astro';

// Simple validator
function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';

    let name = '';
    let email = '';
    let subject = '';
    let message = '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      name = (body.name || '').toString();
      email = (body.email || '').toString();
      subject = (body.subject || '').toString();
      message = (body.message || '').toString();
    } else {
      const form = await request.formData();
      name = (form.get('name') || '').toString();
      email = (form.get('email') || '').toString();
      subject = (form.get('subject') || '').toString();
      message = (form.get('message') || '').toString();
    }

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
    }

    // If SMTP is not configured, accept the submission to avoid blocking the UI in dev.
    const host = import.meta.env.SMTP_HOST as string | undefined;
    const port = parseInt((import.meta.env.SMTP_PORT as string | undefined) || '0', 10);
    const user = import.meta.env.SMTP_USER as string | undefined;
    const pass = import.meta.env.SMTP_PASS as string | undefined;
    const to = (import.meta.env.CONTACT_TO_EMAIL as string | undefined) || user;

    if (!host || !port || !user || !pass || !to) {
      return new Response(
        JSON.stringify({ ok: true, message: 'Submission accepted (email not configured). Configure SMTP to send email.' }),
        { status: 202, headers: { 'content-type': 'application/json' } }
      );
    }

    // Lazy import nodemailer only if needed
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">${message}</pre>
    `;

    await transporter.sendMail({
      from: `${name} <${user}>`,
      replyTo: `${name} <${email}>`,
      to,
      subject: `[Contact] ${subject}`,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
};


