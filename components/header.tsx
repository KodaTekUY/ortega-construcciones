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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-background/10 bg-primary/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex cursor-pointer items-center transition-opacity hover:opacity-80">
            <Image
              src="/872223-background-logo.svg"
              alt="Ortega Construcciones"
              width={220}
              height={52}
              priority
              className="h-10 w-auto"
            />
            <h1 className="ml-2 flex flex-col gap-0 border-l-2 border-[#c4a54b] py-1 pl-2 text-xl font-bold leading-none text-background">
              <span className={`${notoSerifGeorgian.className} antialiased font-bold tracking-wide text-white`}>ORTEGA</span>
              <span
                className={`${notoSerifGeorgian.className} antialiased text-[.64rem] font-light text-[#c4a54b]`}
                style={{ fontStyle: "italic" }}
              >
                CONSTRUCCIONES
              </span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#servicios" className="text-sm font-medium text-background/80 transition-colors hover:text-background">
              Servicios
            </Link>
            <Link href="#proceso" className="text-sm font-medium text-background/80 transition-colors hover:text-background">
              Proceso
            </Link>
            <Link href="#proyectos" className="text-sm font-medium text-background/80 transition-colors hover:text-background">
              Proyectos
            </Link>
            <Link href="#contacto" className="text-sm font-medium text-background/80 transition-colors hover:text-background">
              Contacto
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/59899110347"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1ebe5a]"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm hidden lg:block">WhatsApp</span>
            </a>
            <Button
              type="button"
              className="bg-background text-primary hover:bg-background/90"
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
              className="cursor-pointer rounded-md p-2 text-background transition-colors hover:bg-background/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-b border-background/10 bg-primary lg:hidden">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <Link 
              href="#servicios" 
              className="text-sm font-medium text-background/80 transition-colors hover:text-background"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link 
              href="#proceso" 
              className="text-sm font-medium text-background/80 transition-colors hover:text-background"
              onClick={() => setIsMenuOpen(false)}
            >
              Proceso
            </Link>
            <Link 
              href="#proyectos" 
              className="text-sm font-medium text-background/80 transition-colors hover:text-background"
              onClick={() => setIsMenuOpen(false)}
            >
              Proyectos
            </Link>
            <Link 
              href="#contacto" 
              className="text-sm font-medium text-background/80 transition-colors hover:text-background"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <Button
              type="button"
              className="mt-2 w-full bg-background text-primary hover:bg-background/90"
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
