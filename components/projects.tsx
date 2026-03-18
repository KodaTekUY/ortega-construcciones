"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    location: "Punta Ballena",
    type: "Casa 4 dormitorios",
    size: "320 m²",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    location: "Punta del Este",
    type: "Casa 3 dormitorios",
    size: "280 m²",
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    location: "Piriápolis",
    type: "Casa 2 dormitorios",
    size: "150 m²",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
    location: "José Ignacio",
    type: "Casa 5 dormitorios",
    size: "450 m²",
  },
  {
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop",
    location: "La Barra",
    type: "Casa 3 dormitorios",
    size: "220 m²",
  },
  {
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop",
    location: "Manantiales",
    type: "Casa 4 dormitorios",
    size: "380 m²",
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
            <span className="inline-block mb-4 text-accent font-medium tracking-wider uppercase text-sm">
              Nuestros proyectos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Casas que ya construimos
            </h2>
          </div>
          <a 
            href="#contacto" 
            className="group mt-6 lg:mt-0 inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={project.image}
                  alt={`${project.type} en ${project.location}`}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-70'
                }`} />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                    {project.location}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-background mb-1">
                  {project.type}
                </h3>
                <p className="text-sm text-background/80">
                  {project.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
