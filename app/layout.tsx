import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import '@/app/globals.css'
import { currentUser } from '@clerk/nextjs/server'
import TopBar from '@/components/shared/TopBar'
import LeftSideBar from '@/components/shared/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar'
import BottomBar from '@/components/shared/BottomBar'

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
      <>
        <html lang='en'>
          <ClerkProvider>
            <body>
              <main className={`${inter.className} bg-dark-1`}>
                {children}
              </main>
            </body>
          </ClerkProvider>
        </html>
      </>
    )
  }
  return (
    <>
      <html lang='en'>
        <ClerkProvider>
          <body>
            <main className={`${inter.className} bg-dark-1`}>
              {children}
            </main>
          </body>
        </ClerkProvider>
      </html>
    </>
  )
}