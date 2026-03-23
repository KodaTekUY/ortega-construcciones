"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ImageOff } from "lucide-react"

const projects = [
  { label: "Obra 01" },
  { label: "Obra 02" },
  { label: "Obra 03" },
]

export function Projects() {
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
    <section id="proyectos" className="py-20 lg:py-28 bg-background">
      <div 
        ref={sectionRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 duration-700"
      >
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Obras que hicimos
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Todas las fotos con detalles van en esta sección. Faltan cargar las obras reales.
            </p>
          </div>
          <a 
            href="#contacto" 
            className="group mt-6 lg:mt-0 inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            ¿Querés ver más obras? Escribinos.
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mb-8 rounded-2xl border border-dashed border-accent/40 bg-secondary/60 p-5 text-sm text-secondary-foreground">
          Pendiente de completar con fotos, ubicación, tipo de obra y metros cuadrados reales.
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`rounded-2xl border border-dashed border-border bg-card p-8 transition-all duration-500 ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className="mb-6 flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-accent/30 bg-secondary">
                <div className="text-center">
                  <ImageOff className="mx-auto mb-3 h-10 w-10 text-accent" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-foreground">Falta cargar foto real</p>
                </div>
              </div>

              <div className="space-y-3">
                <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  Pendiente de completar
                </span>
                <h3 className="font-serif text-2xl font-bold text-card-foreground">
                  {project.label}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Ubicación real</li>
                  <li>Tipo de obra</li>
                  <li>Metros cuadrados</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
