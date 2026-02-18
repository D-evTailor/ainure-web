import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

export type EmailAddress = {
  email: string;
  name: string;
};

export type SendMailInput = {
  to: EmailAddress;
  from: EmailAddress;
  subject: string;
  html: string;
  text: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getMailerClient(): MailerSend {
  return new MailerSend({ apiKey: getRequiredEnv("MAILERSEND_API_TOKEN") });
}

export async function sendTransactionalEmail(input: SendMailInput): Promise<void> {
  const mailer = getMailerClient();
  const from = new Sender(input.from.email, input.from.name);
  const to = [new Recipient(input.to.email, input.to.name)];

  const params = new EmailParams()
    .setFrom(from)
    .setTo(to)
    .setSubject(input.subject)
    .setHtml(input.html)
    .setText(input.text);

  await mailer.email.send(params);
}
