export type ContactTemplateInput = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactTemplate(input: ContactTemplateInput): { subject: string; html: string; text: string } {
  const service = input.service?.trim() || "No especificado";
  const company = input.company?.trim() || "No especificada";

  const subject = `Nuevo contacto web: ${input.name}`;
  const html = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(company)}</p>
    <p><strong>Servicio:</strong> ${escapeHtml(service)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
  `;

  const text = [
    "Nuevo mensaje de contacto",
    `Nombre: ${input.name}`,
    `Email: ${input.email}`,
    `Empresa: ${company}`,
    `Servicio: ${service}`,
    "Mensaje:",
    input.message,
  ].join("\n");

  return { subject, html, text };
}
