'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram } from 'react-icons/fa6'
import logo from '@/assets/images/logo.svg'
import { mockLinks } from '@/mocks/mockLinks'
import { FaGlobe } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { AdminContext } from '@/contexts/AdminContext'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { MenuAdmin } from '../MenuAdmin'

export function Header() {
  const { facebookURL, instagramURL, website } = mockLinks
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const routeIsAdmin = pathname.includes('/admin')
  const { titleHeader } = useContext(AdminContext)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`w-full flex justify-center bg-primary z-20 top-0 ${
        isScrolled ? 'fixed shadow-2xl' : 'sticky'
      }`}
    >
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex justify-between">
        <Link
          href="/"
          className="max-w-[300px] w-full hover:scale-[1.05] duration-300"
        >
          <Image
            src={logo}
            alt="Logo EngSol"
            priority
            className="w-full h-full"
          />
        </Link>
        {routeIsAdmin ? (
          <div className="flex items-end md:items-center gap-2 md:gap-8 flex-col-reverse md:flex-row w-full md:w-fit">
            {titleHeader === '' ? (
              <div
                className="w-32 h-8 rounded-full bg-slate-400 animate-pulse duration-200 "
                style={{ animationDelay: '0.1s' }}
              />
            ) : (
              <h2 className="text-xl md:text-2xl font-semibold text-secondary flex items-center">
                {titleHeader}
              </h2>
            )}
            <MenuAdmin />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href={facebookURL}
              target="_blank"
              className=" hover:text-white duration-300"
            >
              <FaFacebookF size={25} />
            </Link>
            <Link
              href={instagramURL}
              target="_blank"
              className=" hover:text-white duration-300"
            >
              <FaInstagram size={25} />
            </Link>
            <Link
              href={website}
              target="_blank"
              className=" hover:text-white duration-300"
            >
              <FaGlobe size={25} />
            </Link>
            <Link
              href="/admin/login"
              className=" hover:text-white duration-300"
            >
              <MdOutlineAdminPanelSettings size={30} />
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
