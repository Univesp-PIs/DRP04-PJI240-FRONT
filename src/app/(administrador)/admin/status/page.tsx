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
        <div className="w-full"></div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              className="cursor-pointer font-bold text-xl"
              htmlFor="statusName"
            >
              Digite o nome do status
            </label>
            <input
              type="text"
              id="statusName"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Nome do status"
            />
          </div>
          <button className="px-4 py-2 bg-secondary text-white rounded-md font-bold hover:bg-green-500 duration-100">
            Criar status
          </button>
        </div>
      </div>
    </section>
  )
}
