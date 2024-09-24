import { Roboto } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.className} antialiased`}>
        <Toaster position="bottom-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  )
}
