"use client"

import { useEffect, useRef, useState } from "react"
import { ClipboardCheck, FileText, Hammer, Key, MapPinned, MessageCircle } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Primera charla",
    description: "Nos contás qué querés construir. Escuchamos, preguntamos y entendemos bien el proyecto antes de hablar de números.",
  },
  {
    icon: MapPinned,
    number: "02",
    title: "Visita al terreno",
    description: "Vamos a ver el lugar y tomamos nota de todo lo que necesitamos saber para arrancar.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Proyecto y presupuesto",
    description: "Nuestros arquitectos desarrollan los planos y te presentamos un presupuesto cerrado y detallado. Cualquier cambio al plan se cotiza antes de ejecutarse, sin sorpresas.",
  },
  {
    icon: ClipboardCheck,
    number: "04",
    title: "Permisos y trámites",
    description: "Nos encargamos de todo ante BPS, IDM y el contador. Vos no tenés que mover un dedo.",
  },
  {
    icon: Hammer,
    number: "05",
    title: "Construcción",
    description: "Arranca la obra siguiendo el plan acordado. Si estás lejos, te mandamos fotos y actualizaciones para que sepas cómo va en todo momento.",
  },
  {
    icon: Key,
    number: "06",
    title: "Entrega",
    description: "Te entregamos la casa lista. Lo que se acordó al principio es lo que recibís al final.",
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
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Cómo trabajamos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sin vueltas ni sorpresas, desde el primer contacto hasta que entrás a tu casa.
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
