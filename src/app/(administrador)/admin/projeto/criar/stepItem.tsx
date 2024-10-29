import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form'
import { schemaCreateProjectProps } from './page'
import { FC, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { CgCloseO } from 'react-icons/cg'
import { RxDragHandleHorizontal } from 'react-icons/rx'
import { Step } from './useCreateProjectHook'

interface DraggableItem {
  index: number
  id: string
  type: string
}

interface DraggableProps {
  step: Step
  index: number
  moveCharacter: (dragIndex: number, hoverIndex: number) => void
  removeStep: (index: number) => void
  register: UseFormRegister<schemaCreateProjectProps>
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

export const DraggableItemComponent: FC<DraggableProps> = ({
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
          defaultValue={step.name || ''}
        >
          <option value="" className="font-bold" disabled>
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
          {...register(`steps.${step.id}.status`)}
          defaultValue={step.status || ''}
        >
          <option value="" className="font-bold" disabled>
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
            className={`hover:scale-105 duration-300 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          />
        </div>
      </div>
    </li>
  )
}
