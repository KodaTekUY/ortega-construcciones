"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

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

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
      </div>

      {/* Content */}
      <div 
        ref={heroRef}
        className={`relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-2xl">
          <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
            Especializados en Maldonado
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight text-balance mb-6">
            Construimos lo que acordamos. Sin sorpresas.
          </h1>
          <p className="text-lg sm:text-xl text-background/90 mb-8 leading-relaxed max-w-xl">
            30 años levantando casas en toda la costa este, de Solís a José Ignacio.
            Presupuesto cerrado, permisos incluidos y sin que tengas que estar encima
            de la obra para que salga bien.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              type="button"
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 font-semibold"
              onClick={() => scrollToSection("contacto")}
            >
              Pedí tu presupuesto
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              type="button"
              size="lg" 
              variant="outline" 
              className="border-background/30 text-background bg-transparent hover:bg-background/10 text-base px-8 py-6"
              onClick={() => scrollToSection("proyectos")}
            >
              Ver obras
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
