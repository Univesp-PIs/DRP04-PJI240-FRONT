'use client'

import { AdminContext } from '@/contexts/AdminContext'
import { useContext, useEffect } from 'react'

export default function Status() {
  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader('Listar e criar status')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="w-full flex justify-center items-center h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex justify-center">
        <div className="w-full">
          {/* TODO: CRIAR TABELA DE LISTAGEM DE STATUS, DICA: USAR TABLE DO HTML */}
        </div>
        <div className="w-full flex flex-col gap-4">
          {/* TODO: CRIAR FORMULÁRIO DE CRIAÇÃO DE STATUS COM LABEL, INPUT E BUTTON DO HTML */}
        </div>
      </div>
    </section>
  )
}
