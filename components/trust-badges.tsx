"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Home, MapPin, Ruler } from "lucide-react"

const badges = [
  {
    icon: Award,
    value: "+30 años",
    label: "Haciendo esto",
  },
  {
    icon: Home,
    value: "+150 casas",
    label: "Entregadas en tiempo",
  },
  {
    icon: Ruler,
    value: "Desde 55 a 1.000 m²",
    label: "Nos adaptamos a tu proyecto",
  },
  {
    icon: MapPin,
    value: "Solís a José Ignacio",
    label: "Toda la costa este cubierta",
  },
]

export function TrustBadges() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div 
        ref={sectionRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center text-center transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <badge.icon className="h-10 w-10 text-accent mb-4" strokeWidth={1.5} />
              <span className="font-serif text-3xl lg:text-4xl font-bold text-primary-foreground mb-2">
                {badge.value}
              </span>
              <span className="text-sm text-primary-foreground/80 uppercase tracking-wider">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
