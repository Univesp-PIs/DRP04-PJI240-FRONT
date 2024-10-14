'use client'

import { AdminContext } from '@/contexts/AdminContext'
import { useContext, useEffect } from 'react'

export default function PedidoStatus({ params }: { params: { slug: string } }) {
  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader(`Status do pedido ${params.slug}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="w-full flex justify-center items-center h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex flex-col justify-center">
        {/* TODO: Implementar a listagem de status do pedido */}
      </div>
    </section>
  )
}
