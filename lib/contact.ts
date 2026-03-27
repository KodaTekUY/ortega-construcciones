export const contactZones = [
  "Solís",
  "Piriápolis",
  "Punta del Este",
  "Punta Ballena",
  "La Barra",
  "José Ignacio",
  "Maldonado ciudad",
  "Resto de Maldonado",
  "Otro Departamento",
] as const

export type ContactFormData = {
  name: string
  phone: string
  zone: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

type ValidationSuccess = {
  success: true
  data: ContactFormData
  errors: {}
}

type ValidationError = {
  success: false
  errors: ContactFormErrors
}

export function validateContactForm(input: Partial<ContactFormData>): ValidationSuccess | ValidationError {
  const name = input.name?.trim() ?? ""
  const phone = input.phone?.trim() ?? ""
  const zone = input.zone?.trim() ?? ""
  const message = input.message?.trim() ?? ""

  const errors: ContactFormErrors = {}

  if (!name) {
    errors.name = "Ingresá tu nombre."
  } else if (name.length < 2) {
    errors.name = "Ingresá un nombre válido."
  }

  if (!phone) {
    errors.phone = "Ingresá un teléfono o WhatsApp."
  } else if (phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Ingresá un teléfono válido."
  }

  if (!zone) {
    errors.zone = "Seleccioná una zona."
  }

  if (!message || message.length < 10) {
    errors.message = "Contanos al menos un poco sobre el proyecto."
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  return {
    success: true,
    data: {
      name,
      phone,
      zone,
      message,
    },
    errors: {},
  }
}

type ContactEmail = {
  subject: string
  text: string
  html: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function formatSubmittedAt(date: Date) {
  return new Intl.DateTimeFormat("es-UY", {
    timeZone: "America/Montevideo",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function buildContactEmail(data: ContactFormData, submittedAt = new Date()): ContactEmail {
  const formattedDate = formatSubmittedAt(submittedAt)
  const safeName = escapeHtml(data.name)
  const safePhone = escapeHtml(data.phone)
  const safeZone = escapeHtml(data.zone)
  const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br />")

  return {
    subject: `Nueva consulta para Ortega Construcciones desde el sitio web: ${data.name}`,
    text: [
      "Nueva consulta desde el sitio web:",
      "",
      `Nombre: ${data.name}`,
      `Teléfono / WhatsApp: ${data.phone}`,
      `Zona de interés: ${data.zone}`,
      `Consulta: ${data.message}`,
      `Fecha: ${formattedDate}`,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #12180c;">
        <h1 style="margin: 0 0 16px; font-size: 24px;">Nueva consulta desde el sitio web:</h1>
        <p style="margin: 0 0 12px;"><strong>Nombre:</strong> ${safeName}</p>
        <p style="margin: 0 0 12px;"><strong>Teléfono / WhatsApp:</strong> ${safePhone}</p>
        <p style="margin: 0 0 12px;"><strong>Zona de interés:</strong> ${safeZone}</p>
        <p style="margin: 0 0 12px;"><strong>Consulta:</strong><br />${safeMessage}</p>
        <p style="margin: 16px 0 0; color: #4b5563;"><strong>Fecha:</strong> ${formattedDate}</p>
      </div>
    `,
  }
}
