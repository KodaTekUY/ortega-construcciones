import { NextResponse } from "next/server"
import { Resend } from "resend"

import { buildContactEmail, validateContactForm } from "@/lib/contact"

const resendFromEmail = process.env.RESEND_FROM_EMAIL!
const contactRecipientEmail = process.env.CONTACT_RECIPIENT_EMAIL!
const resendApiKey = process.env.RESEND_API_KEY

const resend = new Resend(resendApiKey)

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      {
        success: false,
        message: "No pudimos procesar la solicitud.",
      },
      { status: 400 }
    )
  }

  const validation = validateContactForm(body)

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Revisá los datos del formulario.",
        errors: validation.errors,
      },
      { status: 400 }
    )
  }

  if (!resendApiKey) {
    return NextResponse.json(
      {
        success: false,
        message: "Falta configurar RESEND_API_KEY en el entorno.",
      },
      { status: 500 }
    )
  }

  const email = buildContactEmail(validation.data)

  const { error } = await resend.emails.send({
    from: resendFromEmail,
    to: [contactRecipientEmail],
    subject: email.subject,
    text: email.text,
    html: email.html,
  })

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "No pudimos enviar la consulta en este momento." + JSON.stringify(error),
      },
      { status: 502 }
    )
  }

  return NextResponse.json({
    success: true,
    message: "Recibimos tu consulta. Te vamos a contactar a la brevedad.",
  })
}
