'use client'

import { Button } from '@/components/Button'
import { AdminContext } from '@/contexts/AdminContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useForm, UseFormRegister } from 'react-hook-form'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CgCloseO } from 'react-icons/cg'
import { z } from 'zod'

interface Step {
  id: number
  value: string
  rank?: number
}

interface DraggableItem {
  index: number
  id: string
  type: string
}

const schema = z.object({
  nameProject: z.string().min(3, 'Digite seu nome'),
  email: z.string().email('Digite um e-mail válido'),
  steps: z.array(
    z.object({
      step: z.string().min(3, 'Selecione uma etapa'),
      description: z.string().optional(),
    }),
  ),
})

type schemaProps = z.infer<typeof schema>

interface DraggableProps {
  step: Step
  index: number
  moveCharacter: (dragIndex: number, hoverIndex: number) => void
  register: UseFormRegister<schemaProps>
  error?: string
}

const DraggableItemComponent: FC<DraggableProps> = ({
  step,
  index,
  moveCharacter,
  register,
  error,
}) => {
  const ref = useRef<HTMLLIElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'STEP',
    item: { index, id: step.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop<DraggableItem>({
    accept: 'STEP',
    hover: (item) => {
      if (item.index !== index) {
        moveCharacter(item.index, index)
        item.index = index
      }
    },
  })

  drag(drop(ref)) // Associa ambos `drag` e `drop` ao mesmo `ref`

  return (
    <li
      ref={ref} // Usa o ref corretamente tipado
      className="flex flex-row items-start lg:items-center gap-4 w-full md:w-fit"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex-col gap-6 justify-normal h-full w-fit flex lg:hidden text-black">
        <h3 className="text-xl font-bold">Etapas</h3>
        <h3 className="text-xl font-bold">Descrição</h3>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <select
          className="p-2 border border-gray-300 rounded-md font-bold outline-none"
          {...register(`steps.${index}.step`)}
        >
          <option value="" className="font-bold" disabled selected>
            Selecione uma opção
          </option>
          <option value="Compra do equipamento" className="font-bold">
            Compra de equipamento
          </option>
          <option value="Homologação" className="font-bold">
            Homologação
          </option>
          <option value="Entrega dos documentos" className="font-bold">
            Entrega dos documentos
          </option>
        </select>
        {error && (
          <p className="text-red-500 text-center lg:text-left font-medium text-sm">
            {error}
          </p>
        )}
        <textarea
          placeholder="Descrição"
          rows={4}
          {...register(`steps.${index}.description`)}
          className="p-2 border border-gray-300 rounded-md font-bold outline-none w-full"
        />
        <CgCloseO
          size={30}
          className="cursor-pointer hover:scale-105 duration-300"
        />
      </div>
    </li>
  )
}

export default function CriarProjeto() {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, value: 'Entrega dos documentos', rank: 0 },
    { id: 2, value: 'Compra do equipamento', rank: 1 },
    { id: 3, value: 'Homologação', rank: 2 },
    { id: 4, value: 'Entrega dos documentos', rank: 3 },
    { id: 5, value: 'Compra do equipamento', rank: 4 },
    { id: 6, value: 'Homologação', rank: 5 },
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const moveCharacter = (dragIndex: number, hoverIndex: number) => {
    const newSteps = [...steps]
    const [draggedItem] = newSteps.splice(dragIndex, 1)
    newSteps.splice(hoverIndex, 0, draggedItem)
    console.log('newSteps', newSteps)
    // newSteps.forEach((step, index) => (step.rank = index)) // Atualiza o rank
    setSteps(newSteps)
  }

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<schemaProps>({
    resolver: zodResolver(schema),
  })

  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader('Criar projeto')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmitContact(data: schemaProps) {
    setIsSubmitting(true)

    const formattedData = {
      email: data.email,
      project_name: data.nameProject,
      timeline: steps.map((step, index) => ({
        id: step.id,
        rank: index,
        name: data.steps[index].step,
        description: data.steps[index].description || '',
      })),
    }

    console.log('formattedData', formattedData)
    console.log('data', data)

    setIsSubmitting(false)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="w-full flex justify-center items-center md:min-h-[calc(100vh-95.83px)]">
        <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex justify-center">
          <form
            className="flex flex-col gap-16 items-center"
            onSubmit={handleSubmit(handleSubmitContact)}
          >
            <div className="flex flex-col gap-4 max-w-screen-sm">
              <div className="text-center md:text-left flex flex-col gap-2">
                <label
                  className="cursor-pointer font-bold text-xl"
                  htmlFor="projectName"
                >
                  Digite o nome do projeto
                </label>
                <input
                  type="text"
                  id="projectName"
                  {...register('nameProject')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Nome do projeto"
                />

                {errors.nameProject && (
                  <p className="text-red-500 text-center lg:text-left font-medium text-sm">
                    {errors.nameProject.message}
                  </p>
                )}
              </div>
              <div className="text-center md:text-left flex flex-col gap-2">
                <label
                  className="cursor-pointer font-bold text-xl"
                  htmlFor="email"
                >
                  Digite o email de notificação
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Email de notificação"
                />
                {errors.email && (
                  <p className="text-red-500 text-center lg:text-left font-medium text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <ul className="characters flex gap-8 md:gap-4 flex-wrap items-start w-full">
              <div className="hidden lg:flex flex-col gap-6 items-center md:items-start w-fit">
                <h3 className="text-2xl font-bold">Etapas</h3>
                <h3 className="text-2xl font-bold">Descrição</h3>
              </div>
              {steps.map((step, index) => (
                <DraggableItemComponent
                  key={step.id}
                  error={errors.steps?.[index]?.step?.message}
                  step={step}
                  index={index}
                  moveCharacter={moveCharacter}
                  register={register}
                />
              ))}
              <AiOutlinePlusCircle
                size={35}
                className="cursor-pointer hover:scale-105 duration-300 w-full md:w-fit"
              />
            </ul>

            <div className="flex gap-4">
              <Button variant="secondary">Voltar</Button>
              <Button variant="primary" isLoading={isSubmitting}>
                Criar projeto
              </Button>
            </div>
          </form>
        </div>
      </section>
    </DndProvider>
  )
}
