"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, FileText, Clipboard, Hammer, Key } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Consulta inicial",
    description: "Conversamos sobre tu proyecto, visitamos el terreno y entendemos tus necesidades.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Proyecto y presupuesto",
    description: "Desarrollamos el diseño arquitectónico y te presentamos un presupuesto detallado sin sorpresas.",
  },
  {
    icon: Clipboard,
    number: "03",
    title: "Permisos y planificación",
    description: "Gestionamos todos los permisos municipales y planificamos cada etapa de la obra.",
  },
  {
    icon: Hammer,
    number: "04",
    title: "Construcción",
    description: "Ejecutamos la obra con control de calidad constante y reportes de avance periódicos.",
  },
  {
    icon: Key,
    number: "05",
    title: "Entrega",
    description: "Entregamos tu casa lista para habitar, con garantía y documentación completa.",
  },
]

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
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
    <section id="proceso" className="py-20 lg:py-28 bg-secondary">
      <div
        ref={sectionRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
            Cómo trabajamos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Un proceso claro, sin vueltas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sabemos que construir genera ansiedad. Por eso te acompañamos en cada paso con comunicación constante.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-12 transition-all duration-500 ${
                  index % 2 === 0 ? '' : 'lg:direction-rtl'
                } ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
              >
                {/* Content */}
                <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}>
                  <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-primary-foreground" strokeWidth={1.5} />
                    </div>
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      <span className="text-accent font-bold text-sm tracking-wider">{step.number}</span>
                      <h3 className="font-serif text-xl font-bold text-foreground mt-1 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot - Desktop */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent border-4 border-secondary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
