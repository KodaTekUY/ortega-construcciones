"use client"

import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Hablé con varias empresas antes de decidirme, y la verdad es que con Carlos no hubo vuelta que darle. Desde el primer día me explicó todo clarito, sin vueltas. La obra arrancó en fecha y terminó prácticamente en fecha - cosa que no es tan común por acá. El trabajo quedó impecable. Si tengo que hacer algo más adelante, los llamo sin dudarlo.",
    author: "Rodrigo M.",
    location: "Punta del Este",
  },
  {
    quote: "Necesitaba remodelar el local antes de la temporada y tenía los tiempos muy justos. Me recomendaron a Ortega Construcciones y fue lo mejor que me pudieron recomendar. Cumplieron con los plazos y el equipo trabajó con mucho cuidado adentro del local. Abrí a tiempo y con todo listo.",
    author: "Marcela F.",
    location: "Maldonado",
  },
  {
    quote: "Le hicimos una reforma bastante grande a la casa, ampliamos dos ambientes y reformamos el baño principal. Yo tenía mis dudas porque son obras que se complican, pero Carlos estuvo encima de todo desde el principio. Cualquier cosa que surgía la resolvían rápido, sin dramas.",
    author: "Daniel y Verónica",
    location: "Solís",
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
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 relative transition-all duration-500 flex flex-col justify-between ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <Quote className="h-10 w-10 text-primary-foreground/50 mb-6" strokeWidth={1} />
              <blockquote className="text-primary-foreground/90 leading-relaxed mb-8">
                {`${testimonial.quote}`}
              </blockquote>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium text-primary-foreground text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-primary-foreground/70">
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
