"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, MapPin } from "lucide-react"

import { trackGoogleAdsConversion } from "@/lib/ads"
import { contactZones, type ContactFormData, type ContactFormErrors, validateContactForm } from "@/lib/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  zone: "",
  message: "",
}

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatusMessage(null)
    setStatusType(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validation = validateContactForm(formData)

    if (!validation.success) {
      setErrors(validation.errors)
      setStatusType("error")
      setStatusMessage("Revisá los datos marcados y volvé a intentar.")
      return
    }

    setErrors({})
    setIsSubmitting(true)
    setStatusMessage(null)
    setStatusType(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      })

      const payload = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string; errors?: ContactFormErrors }
        | null

      if (!response.ok || !payload?.success) {
        if (payload?.errors) {
          setErrors(payload.errors)
        }

        setStatusType("error")
        setStatusMessage(payload?.message ?? "No pudimos enviar tu consulta. Probá nuevamente.")
        return
      }

      setFormData(initialFormData)
      setStatusType("success")
      setStatusMessage(payload.message ?? "Recibimos tu consulta. Te vamos a contactar a la brevedad.")
      trackGoogleAdsConversion("form")
    } catch {
      setStatusType("error")
      setStatusMessage("No pudimos enviar tu consulta. Probá nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="bg-background py-20 lg:py-28">
      <div
        ref={sectionRef}
        className={`mx-auto max-w-7xl px-4 transition-all duration-700 sm:px-6 lg:px-8 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="mb-6 font-serif text-3xl font-bold text-foreground text-balance sm:text-4xl lg:text-5xl">
              Pedí tu presupuesto
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Dejanos tus datos y coordinamos una primera charla sobre tu proyecto.
            </p>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Zonas de cobertura:</p>
                <div className="flex flex-wrap gap-2">
                  {contactZones.map((zone) => (
                    <span key={zone} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-xl lg:p-10">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-card-foreground">
                  Nombre completo
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className="w-full border-border bg-input focus:border-accent"
                />
                {errors.name ? <p className="mt-2 text-sm text-destructive">{errors.name}</p> : null}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-card-foreground">
                  Teléfono / WhatsApp
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="099 123 456"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  className="w-full border-border bg-input focus:border-accent"
                />
                {errors.phone ? <p className="mt-2 text-sm text-destructive">{errors.phone}</p> : null}
              </div>

              <div>
                <label htmlFor="zone" className="mb-2 block text-sm font-medium text-card-foreground">
                  Zona de interés
                </label>
                <select
                  id="zone"
                  name="zone"
                  value={formData.zone}
                  onChange={(event) => updateField("zone", event.target.value)}
                  aria-invalid={Boolean(errors.zone)}
                  className="h-10 w-full rounded-md border border-border bg-input px-3 text-card-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="">Seleccioná una zona</option>
                  {contactZones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
                {errors.zone ? <p className="mt-2 text-sm text-destructive">{errors.zone}</p> : null}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-card-foreground">
                  Detalles del proyecto o consulta
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Contanos un poco sobre tu proyecto o cualquier consulta que tengas."
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-card-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
                {errors.message ? <p className="mt-2 text-sm text-destructive">{errors.message}</p> : null}
              </div>

              {statusMessage ? (
                <div
                  className={`rounded-xl px-4 py-3 text-sm ${
                    statusType === "success"
                      ? "bg-[#194430]/10 text-[#194430]"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {statusMessage}
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent py-6 text-base font-semibold text-accent-foreground hover:bg-accent/90"
              >
                {isSubmitting ? "Enviando..." : "Pedí tu presupuesto"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Completá tus datos y te contactamos para seguir la conversación.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
