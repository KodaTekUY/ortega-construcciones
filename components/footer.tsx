import Image from "next/image"
import Link from "next/link"
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { notoSerifGeorgian } from "./ui/fonts"

const zones = [
  "Solís",
  "Piriápolis",
  "Punta del Este",
  "Punta Ballena",
  "La Barra",
  "José Ignacio",
  "Maldonado",
  "Más zonas",
]

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
]

export function Footer() {
  return (
    <footer className="bg-black text-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 cursor-pointer transition-opacity hover:opacity-80 flex flex-row w-max content-center items-center">
              <Image
                src="/dark-background-logo.svg"
                alt="Ortega Construcciones"
                width={220}
                height={52}
                priority
                className="h-10 w-auto"
              />
              <h1 className="border-l-2 border-white ml-2 pl-2 text-xl font-bold text-foreground flex flex-col gap-0 leading-none py-1">
                <span className={`${notoSerifGeorgian.className} text-ring font-bold tracking-wide`}>ORTEGA</span>
                <span
                  className={`${notoSerifGeorgian.className} text-white text-[.64rem] font-light`}
                  style={{ fontStyle: "italic" }}
                >
                  CONSTRUCCIONES
                </span>
              </h1>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Construimos en toda la costa este desde hace más de 30 años.
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
                  href="https://wa.me/59899110347"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm"
                >
                  <MessageCircle className="h-5 w-5 text-accent" />
                  <span>WhatsApp: 099 110 347</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+59899110347"
                  className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm"
                >
                  <Phone className="h-5 w-5 text-accent" />
                  <span>Teléfono: 099 110 347</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:ortegamorelcarlos@hotmail.com"
                  className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm"
                >
                  <Mail className="h-5 w-5 text-accent" />
                  <span>ortegamorelcarlos@hotmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Clock3 className="h-5 w-5 text-accent" />
                <span>Lunes a viernes, 7:00 a 19:00</span>
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
          </div>
        </div>
      </div>
    </footer>
  )
}
