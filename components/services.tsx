"use client"

import { useEffect, useRef, useState } from "react"
import { Home, Expand, PenTool, ClipboardCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Home,
    title: "Construcción desde cero",
    description: "Hacemos realidad tu casa soñada. Desde el diseño hasta la entrega de llaves, manejamos todo el proceso con materiales de primera calidad.",
  },
  {
    icon: Expand,
    title: "Ampliaciones y refacciones",
    description: "Transformamos y expandimos tu propiedad existente. Agregamos ambientes, renovamos espacios o modernizamos tu casa de playa.",
  },
  {
    icon: PenTool,
    title: "Proyecto arquitectónico",
    description: "Diseñamos tu proyecto a medida con arquitectos locales que conocen el terreno, el clima y las normativas del Este.",
  },
  {
    icon: ClipboardCheck,
    title: "Gestión de permisos IDM/IMM",
    description: "Nos encargamos de toda la tramitación municipal. Conocemos los procesos de Maldonado y Canelones al detalle.",
  },
]

export function Services() {
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
    <section id="servicios" className="py-20 lg:py-28 bg-background">
      <div 
        ref={sectionRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 duration-700"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
            Nuestros servicios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Todo lo que necesitás para construir
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos un servicio integral para que vos solo te preocupes por disfrutar tu nueva casa.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`group bg-card border-border hover:border-accent/50 transition-all duration-500 hover:shadow-lg cursor-pointer ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" strokeWidth={1.5} />
                </div>
                <CardTitle className="font-serif text-xl text-card-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
