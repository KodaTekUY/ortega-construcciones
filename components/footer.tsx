import Link from "next/link"
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react"

const zones = [
  "Punta del Este",
  "Piriápolis", 
  "Punta Ballena",
  "José Ignacio",
  "La Barra",
  "Maldonado",
  "Canelones Costa",
]

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-xl font-bold text-background tracking-tight">
                Ortega <span className="text-accent">Construcciones</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Construimos casas y complejos en las mejores zonas costeras del Este de Uruguay desde hace más de 25 años.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-background mb-4">
              Navegación
            </h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h4 className="font-serif text-lg font-bold text-background mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              Zonas de cobertura
            </h4>
            <ul className="space-y-2">
              {zones.map((zone, index) => (
                <li key={index} className="text-background/70 text-sm">
                  {zone}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold text-background mb-4">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://wa.me/59899123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp: 099 123 456</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+59899123456"
                  className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm"
                >
                  <Phone className="h-5 w-5" />
                  <span>Teléfono: 099 123 456</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:ortega@gmail.com"
                  className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm"
                >
                  <Mail className="h-5 w-5" />
                  <span>ortega@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} Ortega Construcciones. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-background/50 hover:text-accent transition-colors text-sm">
                Política de privacidad
              </a>
              <a href="#" className="text-background/50 hover:text-accent transition-colors text-sm">
                Términos y condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
