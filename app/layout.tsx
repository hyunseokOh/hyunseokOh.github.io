import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        <GoogleAnalytics gaId="G-E336QLGGPX" />
      </body>
    </html>
  )
}