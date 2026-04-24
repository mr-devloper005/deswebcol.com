import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DM_Sans, Fjalla_One } from 'next/font/google'

import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/lib/auth-context'
import { buildSiteMetadata } from '@/lib/seo'
import { getFactoryState } from '@/design/factory/get-factory-state'

const fjallaOne = Fjalla_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fjalla',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { recipe, brandPack } = getFactoryState()

  return (
    <html lang="en" suppressHydrationWarning className={`${fjallaOne.variable} ${dmSans.variable}`}>
      <body
        data-site-shell={recipe.homeLayout}
        data-motion-pack={recipe.motionPack}
        className={`${brandPack.bodyClassName} ${brandPack.fontClassName} ${brandPack.paletteClassName}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
