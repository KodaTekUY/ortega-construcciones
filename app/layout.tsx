import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

const siteName = 'Ortega Construcciones'
const siteTitle = 'Ortega Construcciones | Constructora en Maldonado y toda la costa este'
const siteDescription =
  'Constructora en Maldonado con más de 30 años de experiencia. Obra nueva, ampliaciones, gestión de permisos y proyecto arquitectónico en Punta del Este, Piriápolis, Punta Ballena, La Barra, José Ignacio y toda la costa este.'

const siteUrl = 'https://carlos-ortega.vercel.app'

const metadataBase = siteUrl ? new URL(siteUrl) : undefined
const socialImage = metadataBase ? new URL('/1-carlos.png', metadataBase).toString() : undefined

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: siteName,
  description: siteDescription,
  ...(siteUrl ? { url: siteUrl } : {}),
  telephone: '+59899110347',
  email: 'ortegamorelcarlos@hotmail.com',
  areaServed: [
    'Solís',
    'Piriápolis',
    'Punta del Este',
    'Punta Ballena',
    'La Barra',
    'José Ignacio',
    'Maldonado',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'UY',
    addressRegion: 'Maldonado',
  },
}

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'constructora en Maldonado',
    'constructora en Punta del Este',
    'construcción de casas en Maldonado',
    'obra nueva en Punta del Este',
    'ampliaciones en Maldonado',
    'proyecto arquitectónico en Maldonado',
    'gestión de permisos de obra',
    'constructora en la costa este',
    'Ortega Construcciones',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: 'construction',
  ...(siteUrl
    ? {
        alternates: {
          canonical: siteUrl,
        },
      }
    : {}),
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    siteName,
    title: siteTitle,
    description: siteDescription,
    ...(siteUrl ? { url: siteUrl } : {}),
    ...(socialImage
      ? {
          images: [
            {
              url: socialImage,
              alt: 'Ortega Construcciones - obra residencial en Maldonado',
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/light-background-logo.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/dark-background-logo.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/light-background-logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
