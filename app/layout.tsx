import { Analytics } from '@vercel/analytics/next'
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

export const metadata: Metadata = {
  title: 'Hyunseok Oh — Quantum Hardware Engineer',
  description:
    'Hyunseok Oh, Quantum Hardware Engineer with hands-on experience across multiple qubit platforms. Building the hardware that makes the quantum future real.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/atom.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/atom.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/atom.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/atom.png',
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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
      <GoogleAnalytics gaId="G-E336QLGGPX" />

    </html>
  )
}
