'use client'

export default function PedidoStatus({ params }: { params: { slug: string } }) {
  return (
    <section className="w-full flex justify-center items-center h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex flex-col justify-center">
        <h3 className="w-full md:w-[60%] bg-primary text-secondary font-medium text-xl p-2 text-center rounded-md">
          Pedido #{params.slug}
        </h3>
        {/* TODO: Implementar a listagem de status do pedido */}
      </div>
    </section>
  )
}
