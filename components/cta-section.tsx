"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, ArrowRight } from "lucide-react"

const zones = [
  "Solís",
  "Piriápolis",
  "Punta del Este",
  "Punta Ballena",
  "La Barra",
  "José Ignacio",
  "Maldonado ciudad",
  "Resto de Maldonado",
  "Otro Departamento",
]

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-background">
      <div 
        ref={sectionRef}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
              Contacto
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Pedí tu presupuesto
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Dejanos tus datos y coordinamos una primera charla sobre tu proyecto.
            </p>
            
            {/* Zones */}
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Zonas de cobertura:</p>
                <div className="flex flex-wrap gap-2">
                  {zones.map((zone, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-xl border border-border">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                  Nombre completo
                </label>
                <Input 
                  id="name"
                  type="text" 
                  placeholder="Juan Pérez"
                  className="w-full bg-input border-border focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
                  Teléfono / WhatsApp
                </label>
                <Input 
                  id="phone"
                  type="tel" 
                  placeholder="099 110 347"
                  className="w-full bg-input border-border focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="zone" className="block text-sm font-medium text-card-foreground mb-2">
                  Zona de interés
                </label>
                <select 
                  id="zone"
                  className="w-full h-10 px-3 rounded-md bg-input border border-border text-card-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="">Seleccioná una zona</option>
                  {zones.map((zone, index) => (
                    <option key={index} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                  Detalles del proyecto o consulta
                </label>
                <textarea 
                  id="message"
                  rows={4}
                  placeholder="Contanos un poco sobre tu proyecto o cualquier consulta que tengas."
                  className="w-full px-3 py-2 rounded-md bg-input border border-border text-card-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-base font-semibold"
              >
                Pedí tu presupuesto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Completá tus datos y te contactamos para seguir la conversación.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
