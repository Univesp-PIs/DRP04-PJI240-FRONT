'use client'

import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CgCloseO } from 'react-icons/cg'
import { z } from 'zod'
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useForm,
  UseFormRegister,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AdminContext } from '@/contexts/AdminContext'
import { Button } from '@/components/Button'
import { RxDragHandleHorizontal } from 'react-icons/rx'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { ModalGeneric } from '@/components/Modal'

interface Step {
  id: number
  name: string
  status: string
  data: string
  description: string
  rank: number
}

interface DraggableItem {
  index: number
  id: string
  type: string
}

const mockApi = {
  email: 'teste@teste.com.br',
  project_name: 'Projeto-1234',
  timelime: [
    {
      id: 0,
      name: 'Entrega dos documentos',
      rank: 1,
      data: format(new Date(), 'yyyy-MM-dd'),
      status: 'waiting',
      description: 'descrição teste',
    },
    {
      id: 1,
      name: 'Compra do equipamento',
      rank: 2,
      data: format(new Date(), 'yyyy-MM-dd'),
      status: 'waiting',
      description: '',
    },
    {
      id: 2,
      name: 'Homologação',
      rank: 3,
      data: format(new Date(), 'yyyy-MM-dd'),
      status: 'waiting',
      description: '',
    },
  ],
}

const schema = z.object({
  nameProject: z.string().min(3, 'Digite seu nome'),
  email: z.string().email('Digite um e-mail válido'),
  steps: z.array(
    z.object({
      step: z.string().min(3, 'Selecione uma etapa'),
      status: z.string().min(3, 'Selecione um status'),
      data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Digite uma data válida'),
      description: z.string().optional(),
    }),
  ),
})

type schemaProps = z.infer<typeof schema>

interface DraggableProps {
  step: Step
  index: number
  moveCharacter: (dragIndex: number, hoverIndex: number) => void
  removeStep: (index: number) => void
  register: UseFormRegister<schemaProps>
  error?: Merge<
    FieldError,
    FieldErrorsImpl<{
      step: string
      status: string
      data: string
      description: string
    }>
  >
}

const DraggableItemComponent: FC<DraggableProps> = ({
  step,
  index,
  moveCharacter,
  removeStep,
  register,
  error,
}) => {
  const ref = useRef<HTMLLIElement>(null)
  const [{ isDragging }, drag] = useDrag({
    type: 'CHARACTER',
    item: { index, id: step.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'CHARACTER',
    hover: (item: DraggableItem) => {
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
      className="flex flex-row md:flex-col items-start md:items-center gap-4"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex-col gap-8 justify-normal h-full w-fit flex lg:hidden text-black">
        <h3 className="text-xl font-bold">Etapa</h3>
        <h3 className="text-xl font-bold">Status</h3>
        <h3 className="text-xl font-bold">Data</h3>
        <h3 className="text-xl font-bold">Descrição da etapa</h3>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <select
          className="p-2 border border-gray-300 rounded-md font-bold outline-none"
          {...register(`steps.${step.id}.step`)} // define o valor padrão
          defaultValue={step.name}
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

        {error?.step && (
          <p className="text-red-500 text-center lg:text-left font-medium text-sm">
            {error.step.message}
          </p>
        )}

        <select
          className="p-2 border border-gray-300 rounded-md font-bold outline-none"
          {...register(`steps.${step.id}.status`)} // define o valor padrão
          defaultValue={step.status}
        >
          <option value="" className="font-bold" disabled selected>
            Selecione uma opção
          </option>
          <option value="waiting" className="font-bold">
            Aguardando
          </option>
          <option value="in progress" className="font-bold">
            Em progresso
          </option>
          <option value="done" className="font-bold">
            Feita
          </option>
        </select>

        {error?.status && (
          <p className="text-red-500 text-center lg:text-left font-medium text-sm">
            {error.status.message}
          </p>
        )}

        <input
          type="date"
          className="p-2 border border-gray-300 rounded-md font-bold outline-none w-full"
          {...register(`steps.${step.id}.data`)} // valor padrão
          defaultValue={step.data}
        />

        {error?.data && (
          <p className="text-red-500 text-center lg:text-left font-medium text-sm">
            {error.data.message}
          </p>
        )}

        <textarea
          placeholder="Descrição"
          rows={4}
          {...register(`steps.${step.id}.description`, {
            value: step.description || '',
          })} // valor padrão
          className="p-2 border border-gray-300 rounded-md font-bold outline-none w-full"
        />

        <div className="flex w-full justify-between">
          <CgCloseO
            size={30}
            className="cursor-pointer hover:scale-105 duration-300"
            onClick={() => removeStep(index)}
          />
          <RxDragHandleHorizontal
            size={30}
            className={`cursor-pointer hover:scale-105 duration-300 cursor-${
              isDragging ? 'grabbing' : 'grab'
            }`}
          />
        </div>
      </div>
    </li>
  )
}

export default function EditarProjeto() {
  //   {
  //   params,
  // }: {
  //   params: { slug: string }
  // }
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const { setTitleHeader } = useContext(AdminContext)
  const [apiData, setApiData] = useState(mockApi)

  useEffect(() => {
    setTitleHeader(`Editar projeto #${apiData.project_name}`)
  }, [setTitleHeader, apiData.project_name])

  const moveCharacter = (dragIndex: number, hoverIndex: number) => {
    const newCharacters = [...apiData.timelime]
    const [draggedItem] = newCharacters.splice(dragIndex, 1)
    newCharacters.splice(hoverIndex, 0, draggedItem)
    setApiData({ ...apiData, timelime: newCharacters })
  }

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<schemaProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      nameProject: apiData.project_name,
      email: apiData.email,
      steps: apiData.timelime.map((step) => ({
        step: step.name,
        status: step.status,
        data: step.data,
        description: step.description,
      })),
    },
  })

  function handleSubmitContact(data: schemaProps) {
    setIsSubmitting(true)

    const formattedData = {
      email: data.email,
      project_name: data.nameProject,
      timeline: apiData.timelime.map((step, index) => ({
        id: step.id,
        rank: index + 1,
        name: data.steps[step.id].step,
        description: data.steps[step.id].description || '',
      })),
    }

    console.log('formattedData', formattedData)
    setIsSubmitting(false)
  }

  const removeStep = useCallback(
    (index: number) => {
      setApiData((prevSteps) => {
        const newSteps = prevSteps.timelime.filter((step) => step.id !== index)
        return { ...prevSteps, timelime: newSteps }
      })
    },
    [setApiData],
  )

  const addStep = useCallback(() => {
    const newStep = {
      id: apiData.timelime.length,
      name: 'Entrega dos documentos',
      data: '',
      status: '',
      description: '',
      rank: apiData.timelime.length,
    }
    setApiData((prevSteps) => {
      const newSteps = [...prevSteps.timelime, newStep]
      return { ...prevSteps, timelime: newSteps }
    })
  }, [apiData])

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="w-full flex justify-center items-center min-h-[calc(100vh-95.83px)]">
        <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 lg:py-20 flex justify-center">
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
            <ul className="characters flex gap-8 md:gap-4 flex-wrap flex-row items-start w-full">
              <div className="hidden lg:flex flex-col gap-6 items-center md:items-start w-fit">
                <h3 className="text-2xl font-bold">Etapa</h3>
                <h3 className="text-2xl font-bold">Status</h3>
                <h3 className="text-2xl font-bold">Data</h3>
                <h3 className="text-2xl font-bold">Descrição</h3>
              </div>
              {apiData.timelime.map((step, index) => (
                <DraggableItemComponent
                  key={step.id}
                  error={errors.steps?.[step.id]}
                  step={step}
                  index={index}
                  moveCharacter={moveCharacter}
                  removeStep={removeStep}
                  register={register}
                />
              ))}
              <AiOutlinePlusCircle
                size={35}
                className="cursor-pointer hover:scale-105 duration-300 w-full md:w-fit"
                onClick={addStep}
              />
            </ul>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => router.push('/admin/dashboard')}
                title="Voltar"
              />
              <Button
                variant="primary"
                isLoading={isSubmitting}
                title="Salvar"
              />

              <ModalGeneric
                button={
                  <Button
                    variant="error"
                    isLoading={isSubmitting}
                    title="Excluir"
                  />
                }
                title="Excluir projeto"
                description="Deseja realmente excluir este projeto?"
                onConfirm={() => console.log('Excluir')}
              />
            </div>
          </form>
        </div>
      </section>
    </DndProvider>
  )
}
