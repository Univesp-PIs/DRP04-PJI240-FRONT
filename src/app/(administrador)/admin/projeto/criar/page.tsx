'use client'

import { AdminContext } from '@/contexts/AdminContext'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CgCloseO } from 'react-icons/cg'

interface Character {
  id: string
  name: string
}

interface DraggableItem {
  index: number
  id: string
  type: string
}

const finalSpaceCharacters: Character[] = [
  { id: '1', name: 'Gary Goodspeed' },
  { id: '2', name: 'Little Cato' },
  { id: '3', name: 'KVN' },
  { id: '4', name: 'Mooncake' },
  { id: '5', name: 'Quinn Ergon' },
]

interface DraggableProps {
  character: Character
  index: number
  moveCharacter: (dragIndex: number, hoverIndex: number) => void
}

const DraggableItemComponent: FC<DraggableProps> = ({
  character,
  index,
  moveCharacter,
}) => {
  const ref = useRef<HTMLLIElement>(null)
  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader('Criar projeto')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [{ isDragging }, drag] = useDrag({
    type: 'CHARACTER',
    item: { index, id: character.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop<DraggableItem>({
    accept: 'CHARACTER',
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
        <select className="p-2 border border-gray-300 rounded-md font-bold outline-none">
          <option value="" className="font-bold" disabled>
            Selecione uma opção
          </option>
          <option value="1" className="font-bold">
            Compra de equipamento
          </option>
          <option value="2" className="font-bold">
            Homologação
          </option>
        </select>
        <textarea
          placeholder="Descrição"
          rows={4}
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
  const [characters, setCharacters] =
    useState<Character[]>(finalSpaceCharacters)

  const moveCharacter = (dragIndex: number, hoverIndex: number) => {
    const newCharacters = [...characters]
    const [draggedItem] = newCharacters.splice(dragIndex, 1)
    newCharacters.splice(hoverIndex, 0, draggedItem)
    setCharacters(newCharacters)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="w-full flex justify-center items-center md:min-h-[calc(100vh-95.83px)]">
        <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex justify-center">
          <form className="flex flex-col gap-16 items-center">
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
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Nome do projeto"
                />
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
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Email de notificação"
                />
              </div>
            </div>
            <ul className="characters flex gap-8 md:gap-4 flex-wrap items-start w-full">
              <div className="hidden lg:flex flex-col gap-6 items-center md:items-start w-fit">
                <h3 className="text-2xl font-bold">Etapas</h3>
                <h3 className="text-2xl font-bold">Descrição</h3>
              </div>
              {characters.map((character, index) => (
                <DraggableItemComponent
                  key={character.id}
                  character={character}
                  index={index}
                  moveCharacter={moveCharacter}
                />
              ))}
              <AiOutlinePlusCircle
                size={35}
                className="cursor-pointer hover:scale-105 duration-300 w-full md:w-fit"
              />
            </ul>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-transparent border rounded-md font-bold hover:bg-red-500 hover:text-white duration-100">
                Voltar
              </button>
              <button className="px-4 py-2 bg-secondary text-white rounded-md font-bold hover:bg-green-500 duration-100">
                Criar projeto
              </button>
            </div>
          </form>
        </div>
      </section>
    </DndProvider>
  )
}
