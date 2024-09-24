import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram } from 'react-icons/fa6'
import logo from '@/assets/images/logo.svg'
import { mockLinks } from '@/mocks/mockLinks'
import { FaGlobe } from 'react-icons/fa'

export function Header() {
  const { facebookURL, instagramURL, website } = mockLinks

  return (
    <header className="w-full flex justify-center bg-primary">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex justify-between">
        <Link href="/" className="max-w-[300px] w-full">
          <Image src={logo} alt="Logo EngSol" className="w-full" />
        </Link>
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
        </div>
      </div>
    </header>
  )
}
