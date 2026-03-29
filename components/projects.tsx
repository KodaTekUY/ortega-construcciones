"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Images, X } from "lucide-react"

type ProjectPhoto = {
  src: string
  description: string
}

type Project = {
  id: string
  description: string
  photos: ProjectPhoto[]
}

const projects: Project[] = [
  {
    id: "01",
    description:
      "Viviendas de dos plantas con ladrillo visto, volúmenes en hormigón y balcones amplios que combinan presencia y terminación prolija.",
    photos: [
      {
        src: "/1/1.webp",
        description: "Frente de vivienda de dos plantas con doble garaje, ladrillo visto y balcón corrido con baranda de vidrio.",
      },
      {
        src: "/1/2.webp",
        description: "Vista desde el jardín de una casa de ladrillo visto con gran ventanal, balcón superior y parquización al frente.",
      },
    ],
  },
  {
    id: "02",
    description:
      "Complejo de viviendas de líneas rectas, fachadas blancas y detalles en piedra, implantado en un terreno amplio con visuales abiertas.",
    photos: [
      {
        src: "/2/2.webp",
        description: "Frente de unidad terminada con fachada blanca, paño central revestido en piedra y balcón corrido en planta alta.",
      },
      {
        src: "/2/3.webp",
        description: "Vista lateral del conjunto con dos bloques terminados y el mar al fondo, mostrando implantación y acceso vehicular.",
      },
    ],
  },
  {
    id: "03",
    description:
      "Complejo residencial entre arbolado, con viviendas de ladrillo pintado, balcones de madera y parrilleros exteriores independientes.",
    photos: [
      {
        src: "/3/1.webp",
        description: "Fachada amarilla de dos plantas con balcones de madera, carpinterías negras y acceso lateral techado.",
      },
      {
        src: "/3/2.webp",
        description: "Vista frontal de una vivienda rosada con balcones de madera y terminaciones exteriores listas para entrega.",
      },
      {
        src: "/3/3.webp",
        description: "Sector central del complejo con parrilleros de ladrillo, pérgolas y viviendas enfrentadas entre árboles.",
      },
      {
        src: "/3/4.webp",
        description: "Casa de ladrillo rojo con chimenea revestida en piedra, cochera lateral y acceso sobre pedregullo.",
      },
    ],
  },
  {
    id: "04",
    description:
      "Casa de dos plantas con base revestida en piedra, volumen superior retranqueado y una implantación limpia sobre terreno abierto.",
    photos: [
      {
        src: "/4/1.webp",
        description: "Vista frontal de vivienda de dos niveles con revestimiento símil piedra en planta baja y césped al frente.",
      },
      {
        src: "/4/2.webp",
        description: "Perspectiva en esquina de la misma casa, mostrando el volumen lateral, el acceso y la terraza superior.",
      },
    ],
  },
  {
    id: "05",
    description:
      "Casa compacta implantada en un entorno serrano, con galería pérgola, muros de piedra y espacios exteriores integrados al paisaje.",
    photos: [
      {
        src: "/5/1.webp",
        description: "Exterior al atardecer de casa compacta con chimenea de piedra, galería pergolada y deck elevado sobre la loma.",
      },
      {
        src: "/5/2.webp",
        description: "Vista lateral de la vivienda con fachada clara, gran paño vidriado y sierras verdes de fondo.",
      },
      {
        src: "/5/3.webp",
        description: "Detalle de la galería con estructura de madera y murete de piedra que define el espacio exterior.",
      },
      {
        src: "/5/4.webp",
        description: "Fogón central revestido en piedra sobre una terraza abierta, pensado como punto de encuentro al aire libre.",
      },
      {
        src: "/5/5.webp",
        description: "Vista interior hacia la galería y el paisaje serrano, con fogón exterior integrado al espacio social.",
      },
    ],
  },
  {
    id: "06",
    description:
      "Vivienda de una planta con galerías de madera, parrillero exterior y ambientes interiores luminosos terminados con sobriedad.",
    photos: [
      {
        src: "/6/1.webp",
        description: "Casa blanca de una planta en luz cálida, con deck perimetral y pérgolas de madera sobre césped cuidado.",
      },
      {
        src: "/6/2.webp",
        description: "Vista posterior de la vivienda con volumen limpio, aberturas corredizas y galería exterior en dos frentes.",
      },
      {
        src: "/6/3.webp",
        description: "Frente lateral con deck, carpinterías negras y sombra proyectada por la pérgola de madera.",
      },
      {
        src: "/6/4.webp",
        description: "Parrillero exterior junto a deck de madera y jardín consolidado, listo para uso cotidiano.",
      },
      {
        src: "/6/5.webp",
        description: "Dormitorio terminado con piso símil madera, paredes blancas y ventana negra con vista al exterior.",
      },
      {
        src: "/6/6.webp",
        description: "Pasillo interior blanco con luz natural al fondo y terminaciones limpias en piso y cielorraso.",
      },
      {
        src: "/6/7.webp",
        description: "Ambiente principal con grandes aberturas, entrada de sol y salida directa a la galería exterior.",
      },
    ],
  },
]

export function Projects() {
  const [activeLightbox, setActiveLightbox] = useState<{
    projectIndex: number
    photoIndex: number
  } | null>(null)

  const activeProject = activeLightbox ? projects[activeLightbox.projectIndex] : null
  const activePhoto = activeProject && activeLightbox ? activeProject.photos[activeLightbox.photoIndex] : null

  const openLightbox = (projectIndex: number, photoIndex: number) => {
    setActiveLightbox({ projectIndex, photoIndex })
  }

  const closeLightbox = () => {
    setActiveLightbox(null)
  }

  const showPreviousPhoto = () => {
    setActiveLightbox((current) => {
      if (!current) return current

      const project = projects[current.projectIndex]
      const previousIndex = (current.photoIndex - 1 + project.photos.length) % project.photos.length

      return { ...current, photoIndex: previousIndex }
    })
  }

  const showNextPhoto = () => {
    setActiveLightbox((current) => {
      if (!current) return current

      const project = projects[current.projectIndex]
      const nextIndex = (current.photoIndex + 1) % project.photos.length

      return { ...current, photoIndex: nextIndex }
    })
  }

  useEffect(() => {
    if (!activeLightbox) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [activeLightbox])

  useEffect(() => {
    if (!activeLightbox) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox()
      }

      if (event.key === "ArrowLeft") {
        showPreviousPhoto()
      }

      if (event.key === "ArrowRight") {
        showNextPhoto()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeLightbox])

  return (
    <section id="proyectos" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground text-balance sm:text-4xl lg:text-5xl">
              Obras que hicimos
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Cada casa es distinta. El nivel de terminación, siempre el mismo
            </p>
          </div>
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-accent"
          >
            ¿Querés ver más obras? Escribinos.
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, projectIndex) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-[28px] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <button
                type="button"
                onClick={() => openLightbox(projectIndex, 0)}
                aria-label={`Abrir foto principal de la obra ${project.id}`}
                aria-haspopup="dialog"
                className="relative block aspect-[4/3] w-full overflow-hidden cursor-pointer text-left"
              >
                <Image
                  src={project.photos[0].src}
                  alt={project.photos[0].description}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm">
                  <Images className="h-3.5 w-3.5" />
                  {project.photos.length} fotos
                </div>
              </button>

              <div className="space-y-5 p-6">
                <div className="space-y-3">
                  <h3 className="hidden font-serif text-2xl font-bold text-card-foreground">Obra {project.id}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Galería completa
                    </p>
                    <span className="text-xs text-muted-foreground">Click en una foto para verla</span>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-1">
                    {project.photos.map((photo, index) => (
                      <figure key={photo.src} className="w-44 shrink-0 space-y-2">
                        <button
                          type="button"
                          onClick={() => openLightbox(projectIndex, index)}
                          aria-label={`Abrir foto ${index + 1} de la obra ${project.id}`}
                          aria-haspopup="dialog"
                          className="relative block h-28 w-full overflow-hidden rounded-2xl border border-border text-left transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                        >
                          <Image
                            src={photo.src}
                            alt={photo.description}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="176px"
                          />
                        </button>
                        <figcaption className="text-xs leading-5 text-muted-foreground">{photo.description}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject && activePhoto ? (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de la obra ${activeProject.id}`}
          onClick={closeLightbox}
        >
          <div className="h-[100dvh] p-4 sm:p-5 lg:p-6">
            <div
              className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex shrink-0 items-start justify-between gap-4 text-white">
                <div>
                  <p className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                    Obra {activeProject.id}
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    Foto {activeLightbox!.photoIndex + 1} de {activeProject.photos.length}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Cerrar galería"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative mt-4 min-h-0 flex-1">
                {activeProject.photos.length > 1 ? (
                  <button
                    type="button"
                    onClick={showPreviousPhoto}
                    aria-label="Ver foto anterior"
                    className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white transition-colors hover:bg-black/65 sm:left-5"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                ) : null}

                <div className="flex h-full min-h-0 items-center justify-center rounded-[28px] border border-white/10 bg-white/5 p-3 sm:p-4">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.description}
                    className="h-auto max-h-full w-auto max-w-full rounded-[22px] object-contain shadow-2xl"
                  />
                </div>

                {activeProject.photos.length > 1 ? (
                  <button
                    type="button"
                    onClick={showNextPhoto}
                    aria-label="Ver foto siguiente"
                    className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white transition-colors hover:bg-black/65 sm:right-5"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                ) : null}
              </div>

              <div className="mt-4 shrink-0 space-y-4">
                <div className="flex flex-col gap-3 text-white/80 lg:flex-row lg:items-end lg:justify-between">
                  <p className="max-w-4xl text-sm leading-6">{activePhoto.description}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">Esc para cerrar</p>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {activeProject.photos.map((photo, index) => {
                    const isActive = index === activeLightbox!.photoIndex

                    return (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => openLightbox(activeLightbox!.projectIndex, index)}
                        aria-label={`Ir a la foto ${index + 1} de la obra ${activeProject.id}`}
                        className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? "border-white shadow-lg shadow-black/30"
                            : "border-white/15 opacity-70 hover:border-white/40 hover:opacity-100"
                        }`}
                      >
                        <Image src={photo.src} alt={photo.description} fill className="object-cover" sizes="112px" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
