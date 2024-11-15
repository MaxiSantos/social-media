import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import '@/app/globals.css'
import { currentUser } from '@clerk/nextjs/server'

export const metadata: Metadata = {
  title: 'Twiddle',
  description: 'A social media app, to discover what is happening now in the world'
}

const inter = Inter({
  subsets: ['latin']
})

export default async function RootLayout({ children }:
  Readonly<{
    children: React.ReactNode
  }>
) {
  const user = await currentUser()
  if (!user) {
    return (
      <ClerkProvider>
        <html lang='en'>
          <body>
            <main className={`${inter.className} bg-dark-1`}>
              {children}
            </main>
          </body>
        </html>
      </ClerkProvider>
    )
  }
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <main className={`${inter.className} bg-dark-1`}>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}