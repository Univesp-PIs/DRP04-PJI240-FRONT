'use client'

import { AdminContext } from '@/contexts/AdminContext'
import { useContext, useEffect, useState } from 'react'

export default function Status() {
  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader('Listar e criar status')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Estados para controlar as cores dos quadrados
  const [status, setStatus] = useState([
    {
      title: 'Homologação',
      checked: false,
    },
    {
      title: 'Compra do equipamento',
      checked: false,
    },
    {
      title: 'Entrega dos documentos',
      checked: false,
    },
  ])

  // Função para alternar entre verde e vermelho
  const toggleColor = (quadrado: any) => {
    const newitem = status.map((item) => {
      if (quadrado.title === item.title) {
        item.checked = !item.checked
      }
      return item
    })
    setStatus(newitem)
  }

  return (
    <section className="w-full flex justify-center items-center h-[calc(40vh-95.83px)]">
      {/* Quadro de Status com seleção de quadrados representando ativados ou desativados */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Listagem dos Status
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Disponível
              </th>
            </tr>
          </thead>
          <tbody>
            {status.map((item) => (
              <tr key={item.title}>
                <td className="px-4 py-2 border border-gray-300">
                  {item.title}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <div
                    className={`w-4 h-4 rounded cursor-pointer ${item.checked ? 'bg-green-500' : 'bg-red-500'}`}
                    onClick={() => toggleColor(item)}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Campo de Lista de status e criar status */}
      <div className="w-[500px] max-w-screen-xl px-4 xl:px-0 py-4 flex justify-center">
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
          <button className="px-4 py-2 bg-secondary text-white rounded-md font-bold hover:bg-[#1e1eff] duration-100">
            Criar status
          </button>
        </div>
      </div>

      {/* Botões Voltar e Salvar */}
      <div className="flex justify-center gap-4 mt-8 absolute bottom-8 left-0 right-0">
        <button className="px-6 py-2 border border-[#1c199c] text-[#1c199c] bg-white rounded-md shadow hover:bg-[#a8a8a8] duration-150">
          Voltar
        </button>
        <button className="px-6 py-2 bg-[#1c199c] text-white rounded-md shadow hover:bg-[#1e1eff] duration-150">
          Salvar
        </button>
      </div>
    </section>
  )
}
