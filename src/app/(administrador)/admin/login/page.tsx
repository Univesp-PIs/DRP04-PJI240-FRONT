'use client'

import { AdminContext } from '@/contexts/AdminContext'
import { useContext, useEffect } from 'react'

export default function Login() {
  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader('Painel do Administrador dos Pedidos')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="w-full flex justify-center items-center h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex justify-center">
        <h1 className="text-4xl font-bold">Login de admin</h1>
        {/* TODO: Criar página de login */}
      </div>
    </section>
  )
}
