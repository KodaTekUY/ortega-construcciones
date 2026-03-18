"use client"

import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Vivimos en Buenos Aires y construir desde lejos nos daba mucho miedo. Pero ellos se encargaron de todo: permisos, avances, fotos semanales. Hoy disfrutamos nuestra casa en Punta Ballena cada verano.",
    author: "Martín y Carolina Fernández",
    location: "Punta Ballena",
    initials: "MF",
  },
  {
    quote: "Cumplieron los plazos a rajatabla. En un rubro donde los atrasos son moneda corriente, entregar en fecha me sorprendió gratamente. Muy profesionales.",
    author: "Ricardo Bentancor",
    location: "Piriápolis",
    initials: "RB",
  },
  {
    quote: "Lo que más valoré fue la transparencia. Presupuesto cerrado, sin sorpresas ni gastos ocultos. Y el resultado final superó mis expectativas. Mi casa quedó espectacular.",
    author: "Luciana Gómez",
    location: "José Ignacio",
    initials: "LG",
  },
]

export function Testimonials() {
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
    <section className="py-20 lg:py-28 bg-primary">
      <div 
        ref={sectionRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 relative transition-all duration-500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <Quote className="h-10 w-10 text-accent/50 mb-6" strokeWidth={1} />
              <blockquote className="text-primary-foreground/90 leading-relaxed mb-8">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-serif text-accent font-bold">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-primary-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-primary-foreground/70">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
