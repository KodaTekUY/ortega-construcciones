"use client"

import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "[Texto del testimonio tal cual lo dijo el cliente]",
    author: "Nombre y apellido",
    location: "Zona donde construyó",
  },
  {
    quote: "[Texto del testimonio tal cual lo dijo el cliente]",
    author: "Nombre y apellido",
    location: "Zona donde construyó",
  },
  {
    quote: "[Texto del testimonio tal cual lo dijo el cliente]",
    author: "Nombre y apellido",
    location: "Zona donde construyó",
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
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Lo que dicen los que ya construyeron
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/70">
            Esta sección sigue pendiente de completar con testimonios reales.
          </p>
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
              <Quote className="h-10 w-10 text-primary-foreground/50 mb-6" strokeWidth={1} />
              <span className="mb-4 inline-flex rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                Pendiente de completar
              </span>
              <blockquote className="text-primary-foreground/90 leading-relaxed mb-8">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-bold">
                  ?
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
