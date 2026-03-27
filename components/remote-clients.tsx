import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function RemoteClients() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground text-balance sm:text-4xl lg:text-5xl">
            ¿Estás en Argentina o en otro país? Ya lo hicimos antes.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Varios de nuestros clientes construyeron su casa en el Este de Uruguay sin
              pisar la obra más de lo necesario. La distancia no es un problema
              cuando hay comunicación constante y alguien que realmente se hace cargo.
            </p>
            <p>
              Nos manejamos con fotos, videos y reportes de avance para que sepas
              exactamente cómo va tu obra, desde donde estés. Y si surge algo, te
              avisamos antes de tomar cualquier decisión.
            </p>
            <p className="font-medium text-foreground">
              Vos elegís qué construir. Nosotros nos encargamos de que pase.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-accent/20 bg-background p-8 shadow-xl lg:p-10">
          <div className="mb-6 flex gap-6 items-end justify-between w-full">
            <h3 className="mb-4 font-serif text-2xl font-bold text-card-foreground">
              Seguimiento claro, aunque estés lejos
            </h3>
            <Image
              src="/de-uy-al-mundo.svg"
              alt="De Uruguay al Mundo"
              width={92}
              height={92}
            />
          </div>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            La obra puede avanzar con reportes, fotos y comunicación constante,
            sin que tengas que estar viajando para controlar cada paso.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-accent"
          >
            Contanos tu proyecto
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
