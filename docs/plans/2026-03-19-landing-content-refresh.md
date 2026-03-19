# Landing Content Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reemplazar el contenido ficticio principal de la landing por el copy provisto y dejar placeholders explícitos donde todavía faltan obras y testimonios reales.

**Architecture:** La implementación mantiene la estructura actual de componentes de la home y actualiza su contenido estático. Se agrega una nueva sección para clientes del exterior y se reformulan proyectos/testimonios para evitar seguir mostrando datos ficticios mientras quedan listos para completar.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, lucide-react

### Task 1: Actualizar el contenido principal

**Files:**
- Modify: `components/hero.tsx`
- Modify: `components/trust-badges.tsx`
- Modify: `components/services.tsx`
- Modify: `components/process.tsx`
- Modify: `components/header.tsx`
- Modify: `components/footer.tsx`

**Step 1: Ajustar textos y CTAs en hero/header/footer**

Actualizar títulos, subtítulos, botones, teléfono, email, horarios, tagline y zonas con la información entregada.

**Step 2: Reemplazar métricas y servicios**

Actualizar el arreglo de badges y el arreglo de servicios para reflejar el nuevo contenido real.

**Step 3: Ampliar el proceso**

Pasar el proceso de 5 a 6 pasos y usar los títulos/descripciones exactos entregados.

### Task 2: Agregar la nueva sección comercial

**Files:**
- Create: `components/remote-clients.tsx`
- Modify: `app/page.tsx`

**Step 1: Crear componente**

Agregar una sección intermedia con el texto para clientes en Argentina o en el exterior y un CTA hacia contacto.

**Step 2: Integrar en la home**

Insertar la nueva sección en una posición lógica dentro del flujo de la landing.

### Task 3: Reconvertir proyectos y testimonios a placeholders explícitos

**Files:**
- Modify: `components/projects.tsx`
- Modify: `components/testimonials.tsx`

**Step 1: Quitar la apariencia de contenido terminado**

Eliminar los datos ficticios actuales y reemplazarlos por tarjetas placeholder claras.

**Step 2: Mantener estructura lista para completar**

Conservar títulos, layout y CTA para que luego sea sencillo cargar obras y testimonios reales.

### Task 4: Verificar

**Files:**
- Verify: `components/*.tsx`
- Verify: `app/page.tsx`

**Step 1: Ejecutar lint**

Run: `npm run lint`

**Step 2: Ejecutar build**

Run: `npm run build`

**Step 3: Revisar diff final**

Run: `git diff -- app/page.tsx components docs/plans/2026-03-19-landing-content-refresh.md`
