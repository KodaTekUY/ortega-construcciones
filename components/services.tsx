"use client"

import { useEffect, useRef, useState } from "react"
import { Home, Expand, PenTool, ClipboardCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Home,
    title: "Obra nueva",
    description: "De la reunión inicial a la entrega de llaves. Vos llegás con el terreno y el proyecto, nosotros nos encargamos del resto. Presupuesto cerrado, materiales de primera y seguimiento en cada etapa.",
  },
  {
    icon: Expand,
    title: "Ampliaciones",
    description: "Si tu casa necesita más espacio, lo construimos con el mismo nivel de terminación que el resto de la obra. Sin parches, sin diferencias.",
  },
  {
    icon: ClipboardCheck,
    title: "Gestión de permisos y trámites",
    description: "Los trámites municipales ante BPS, IDM y la documentación con contador los manejamos nosotros. Conocemos los procesos de la zona y vos no tenés que lidiar con nada de eso.",
  },
  {
    icon: PenTool,
    title: "Proyecto arquitectónico",
    description: "Trabajamos con arquitectos de la zona que conocen el terreno, el clima y las normativas del Este. Si llegás sin planos, arrancamos desde cero con vos.",
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
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Lo que hacemos
          </h2>
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
