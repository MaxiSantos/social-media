import { Inter } from 'next/font/google' 
import { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import '@/globals.css'

export const metadata: Metadata = {
  title: 'social media',
  description: 'testing project'
}

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <main className={`${inter.className}bg-dark-1`}>
            <div className='w-full flex justify-center items-center min-h-screen'>
              {children}
            </div>
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}