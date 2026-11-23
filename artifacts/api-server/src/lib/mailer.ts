import nodemailer, { type Transporter } from "nodemailer";

export type MailMessage = {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

export class MailerNotConfiguredError extends Error {
  constructor() {
    super("SMTP settings are missing");
    this.name = "MailerNotConfiguredError";
  }
}

let cachedTransport: Transporter | null = null;

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portValue = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM?.trim();
  const admin = process.env.PERSONALIZADOS_ADMIN_EMAIL?.trim();
  const port = Number(portValue);

  if (!host || !portValue || !Number.isInteger(port) || port < 1 || port > 65535 ||
      !user || !pass || !from || !admin) {
    return null;
  }
  return { host, port, user, pass, from, admin };
}

export function isMailerConfigured(): boolean {
  return getSmtpConfig() !== null;
}

export function getPersonalizedAdminEmail(): string | null {
  return getSmtpConfig()?.admin ?? null;
}

export async function sendMail(message: MailMessage): Promise<void> {
  const config = getSmtpConfig();
  if (!config) throw new MailerNotConfiguredError();

  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }

  await cachedTransport.sendMail({
    from: config.from,
    to: message.to,
    ...(message.replyTo ? { replyTo: message.replyTo } : {}),
    subject: message.subject,
    text: message.text,
    html: message.html,
  });
}
