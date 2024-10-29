import { AdminContext } from '@/contexts/AdminContext'
import { format } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { schemaCreateProjectProps } from './page'

export interface Step {
  id: number
  name: string
  status: string
  data: string | undefined
  description: string
  rank: number
}

export function useCreateProjectHook() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dateNow = format(new Date(), 'yyyy-MM-dd')

  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader('Criar projeto')
  }, [setTitleHeader])

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 0,
      name: 'Entrega dos documentos',
      rank: 1,
      data: dateNow,
      status: 'in progress',
      description: '',
    },
    {
      id: 1,
      name: 'Compra do equipamento',
      rank: 2,
      data: dateNow,
      status: 'in progress',
      description: '',
    },
    {
      id: 2,
      name: 'Homologação',
      rank: 3,
      data: dateNow,
      status: 'in progress',
      description: '',
    },
  ])

  const moveCharacter = (dragIndex: number, hoverIndex: number) => {
    const newCharacters = [...steps]
    const [draggedItem] = newCharacters.splice(dragIndex, 1)
    newCharacters.splice(hoverIndex, 0, draggedItem)
    setSteps(newCharacters)
  }

  function handleSubmitContact(data: schemaCreateProjectProps) {
    setIsSubmitting(true)

    const formattedData = {
      email: data.email,
      client_name: data.nameClient,
      project_name: data.nameProject,
      timeline: steps.map((step, index) => ({
        id: step.id,
        rank: index + 1,
        name: data.steps[step.id].step,
        status: data.steps[step.id].status,
        data: data.steps[step.id].data || null,
        description: data.steps[step.id].description || '',
      })),
    }

    console.log('formattedData', formattedData)
    setIsSubmitting(false)
  }

  const removeStep = (index: number) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index))
  }

  const addStep = () => {
    const newStep = {
      id: steps.length,
      name: '',
      data: undefined,
      status: '',
      description: '',
      rank: steps.length,
    }
    setSteps((prevSteps) => [...prevSteps, newStep])
  }

  return {
    isSubmitting,
    steps,
    moveCharacter,
    removeStep,
    addStep,
    handleSubmitContact,
  }
}
