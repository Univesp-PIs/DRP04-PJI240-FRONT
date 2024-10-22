import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { AdminContextProvider } from '@/contexts/AdminContext'
import { AuthProvider } from '@/contexts/AuthContex'

export const metadata: Metadata = {
  title: 'EngSol - Admin',
  description: 'Sistema EngSol para consulta de pedidos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AdminContextProvider>
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
    </AdminContextProvider>
  )
}
