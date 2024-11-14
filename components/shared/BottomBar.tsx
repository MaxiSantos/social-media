'use client'
import React, { Suspense } from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server'
import Skeleton from 'react-loading-skeleton';


type Props = {}

const BottomBar = () => {
  const pathname = usePathname()
  const { userId } = useAuth()

  return (
  <>
    <section className="bottombar">
      <div className="bottombar_container">
        <Suspense fallback={<Skeleton />}>
          <ClerkProvider dynamic>
            {
              sidebarLinks.map((link) => {
                const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname === link.route)
                if (link.route === '/profile') {
                  link.route = `${link.route}/${userId}`
                }
                return (
                  <Link
                    href={link.route}
                    key={link.label}
                    className={` bottombar_link ${isActive &&
                      'bg-primary-500'
                      }`}
                  >
                    <Image
                      src={link.imgURL}
                      alt={link.label}
                      width={24}
                      height={24}
                    />
                    <p className='text-light-1 text-subtle-medium'>
                      {link.label}
                    </p>
                  </Link>
                )
              }
              )
            }
          </ClerkProvider>
        </Suspense>
      </div>
    </section>
  </>
)
}

export default BottomBar