import Image from "next/image"
import Link from "next/link"
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { notoSerifGeorgian } from "./ui/fonts"
import { TrackedWhatsAppLink } from "./tracked-whatsapp-link"

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

const rawPhoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER!

let phoneNumber = rawPhoneNumber!.replaceAll(/\D/g, '').trim()
if (phoneNumber.startsWith('0')) phoneNumber = phoneNumber.substring(1)

const telephone =  '+' + process.env.NEXT_PUBLIC_PHONE_NUMBER_EXTENSION! + phoneNumber

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL!
const availableTime = process.env.NEXT_PUBLIC_AV_TIME!

export function Footer() {
  return (
    <footer className="bg-black text-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 xl:gap-0 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/#hero" className="mb-4 cursor-pointer transition-opacity hover:opacity-80 flex flex-col w-max content-center items-center">
              <Image
                src="/dark-background-logo.svg"
                alt="Ortega Construcciones"
                width={220}
                height={52}
                priority
                className="h-16 w-auto mb-2"
              />
              <h1 className="border-t-2 border-[#c4a54b] text-xl font-bold text-foreground flex flex-col gap-0 leading-none p-2">
                <span className={`${notoSerifGeorgian.className} text-white font-bold tracking-wide`}>ORTEGA</span>
                <span
                  className={`${notoSerifGeorgian.className} text-[#c4a54b] text-[.64rem] font-light`}
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
                <TrackedWhatsAppLink
                  href={`https://wa.me/${telephone.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm"
                >
                  <MessageCircle className="h-5 w-5 min-w-5 text-accent" />
                  <span>WhatsApp: {rawPhoneNumber}</span>
                </TrackedWhatsAppLink>
              </li>
              <li>
                <a
                  href={`tel:${telephone}`}
                  className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm"
                >
                  <Phone className="h-5 w-5 min-w-5 text-accent" />
                  <span>Teléfono: {rawPhoneNumber}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors text-sm break-all"
                >
                  <Mail className="h-5 w-5 min-w-5 text-accent" />
                  <span>{contactEmail}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Clock3 className="h-5 w-5 min-w-5 text-accent" />
                <span>{availableTime}</span>
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
            <a
              className="flex items-center gap-2 group"
              href="https://kodatekuy.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/kodatek.webp"
                alt="KodaTek"
                width={24}
                height={24}
              />
              <span className="text-background/50 text-sm">
                Desarrollado por{" "}
                <p className="text-background/70 group-hover:text-accent transition-colors inline">
                  KodaTek
                </p>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
