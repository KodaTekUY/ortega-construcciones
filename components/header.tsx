"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notoSerifGeorgian } from "./ui/fonts"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex cursor-pointer items-center transition-opacity hover:opacity-80">
            <Image
              src="/white-background-logo.svg"
              alt="Ortega Construcciones"
              width={220}
              height={52}
              priority
              className="h-10 w-auto"
            />
            <h1 className="border-l-2 border-primary ml-2 pl-2 text-xl font-bold text-foreground flex flex-col gap-0 leading-none py-1">
              <span className={`${notoSerifGeorgian.className} text-ring font-bold tracking-wide`}>ORTEGA</span>
              <span
                className={`${notoSerifGeorgian.className} text-primary text-[.64rem] font-light`}
                style={{ fontStyle: "italic" }}
              >
                CONSTRUCCIONES
              </span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#servicios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Servicios
            </Link>
            <Link href="#proceso" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Proceso
            </Link>
            <Link href="#proyectos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Proyectos
            </Link>
            <Link href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/59899110347"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-ring px-4 text-sm font-medium text-white transition-colors hover:bg-[#1ebe5a]"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm hidden lg:block">WhatsApp</span>
            </a>
            <Button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => scrollToSection("contacto")}
            >
              Pedí tu presupuesto
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="https://wa.me/59899110347"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5a]"
              aria-label="Abrir WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer rounded-md p-2 text-foreground transition-colors hover:bg-secondary/80"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <Link 
              href="#servicios" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link 
              href="#proceso" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Proceso
            </Link>
            <Link 
              href="#proyectos" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Proyectos
            </Link>
            <Link 
              href="#contacto" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <Button
              type="button"
              className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => scrollToSection("contacto")}
            >
              Pedí tu presupuesto
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
