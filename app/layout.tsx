import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const siteUrl = 'https://hyunseokoh.github.io'
const siteTitle = 'Hyunseok (Dan) Oh — Quantum Hardware Engineer'
const siteDescription =
  'Hyunseok (Dan) Oh, Quantum Hardware Engineer with hands-on experience across multiple qubit platforms. Building the hardware that makes the quantum future real.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  generator: null,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/atom.png',
    apple: '/atom.png',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Hyunseok Oh',
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Hyunseok Oh, Quantum Hardware Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0e17',
}

// Structured data so search engines can connect this site to your profiles and publications.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hyunseok Oh',
  alternateName: ['Dan Oh', 'Hyunseok (Dan) Oh'],
  url: siteUrl,
  image: `${siteUrl}/portrait.jpg`,
  jobTitle: 'Calibration Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Google Quantum AI',
    url: 'https://quantumai.google/',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of California, Santa Barbara' },
    { '@type': 'CollegeOrUniversity', name: 'Seoul National University' },
  ],
  knowsAbout: [
    'Quantum hardware',
    'Qubit calibration',
    'Diamond optomechanics',
    'NV centers',
    'Nanofabrication',
  ],
  sameAs: [
    'https://linkedin.com/in/hyunseok0222',
    'https://github.com/hyunseokOh',
    'https://scholar.google.com/citations?hl=en&user=GpharwMAAAAJ',
    'https://orcid.org/0000-0003-0076-3844',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} bg-background`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <GoogleAnalytics gaId="G-E336QLGGPX" />
      </body>
    </html>
  )
}