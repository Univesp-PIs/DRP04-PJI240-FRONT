'use client'

import { IoIosArrowForward } from 'react-icons/io'

export default function PedidoStatus({ params }: { params: { slug: string } }) {
  return (
    <section className="w-full flex justify-center items-center h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex flex-col justify-center items-center">
        <h3 className="w-full md:w-[60%] bg-primary text-secondary font-medium text-xl p-2 text-center rounded-md">
          Andamento do Pedido #{params.slug}
        </h3>
        <table className="w-full md:w-[60%] text-xl p-2 text-center rounded-md divide-y divide-gray-200">
          <thead>
            <tr>
              <th></th>
              <th className="px-6 py-3 text-right text-xs font-thin text-gray-400">
                Atualizado em...
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sl font-medium text-gray-900 whitespace-now">
                {' '}
                Compra do Equipamento
                <p className="px-6 py-3 text-xs font-thin text-gray-400">
                  Observação
                </p>
              </td>
              <td className="px-6 py-3 text-right text-xs font-thin text-gray-400">
                19/10/2024
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sl font-medium text-gray-900 whitespace-now">
                {' '}
                Homologação do projeto
                <p className="px-6 py-3 text-xs font-thin text-gray-400">
                  Observação
                </p>
              </td>
              <td className="px-6 py-3 text-right text-xs font-thin text-gray-400">
                19/10/2024
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sl font-medium text-gray-900 whitespace-now">
                {' '}
                Recebimento do equipamento
                <p className="px-6 py-3 text-xs font-thin text-gray-400">
                  Observação
                </p>
              </td>
              <td className="px-6 py-3 text-right text-xs font-thin text-gray-400">
                19/10/2024
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sl font-medium text-gray-900 whitespace-now">
                {' '}
                Instalação
                <p className="px-6 py-3 text-xs font-thin text-gray-400">
                  Observação
                </p>
              </td>
              <td className="px-6 py-3 text-right text-xs font-thin text-gray-400">
                19/10/2024
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sl font-medium text-gray-900 whitespace-now">
                {' '}
                Vistoria e troca do medidor
                <p className="px-6 py-3 text-xs font-thin text-gray-400">
                  Observação
                </p>
              </td>
              <td className="px-6 py-3 text-right text-xs font-thin text-gray-400">
                19/10/2024
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sl font-medium text-gray-900 whitespace-now">
                {' '}
                Configuração e monitoramento
                <p className="px-6 py-3 text-xs font-thin text-gray-400">
                  Observação
                </p>
              </td>
              <td className="px-6 py-3 text-right text-xs font-thin text-gray-400">
                19/10/2024
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sl font-medium text-gray-900 whitespace-now">
                {' '}
                Entrega dos documentos
                <p className="px-6 py-3 text-xs font-thin text-gray-400">
                  Observação
                </p>
              </td>
              <td className="px-6 py-3 text-right text-xs font-thin text-gray-400">
                19/10/2024
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="bg-secondary flex gap-1 items-center text-white py-2 px-8 rounded-xl hover:bg-primary duration-300"
        >
          Voltar
          <IoIosArrowForward size={20} />
        </button>
        {/* TODO: Implementar a listagem de status do pedido */}
      </div>
    </section>
  )
}
