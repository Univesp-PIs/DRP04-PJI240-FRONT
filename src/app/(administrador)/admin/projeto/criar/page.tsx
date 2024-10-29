'use client'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/Button'
import { format } from 'date-fns'
import { DraggableItemComponent } from './stepItem'
import { useCreateProjectHook } from './useCreateProjectHook'

const schema = z.object({
  nameProject: z.string().min(3, 'Digite o nome do projeto'),
  nameClient: z.string().min(3, 'Digite o nome do cliente'),
  email: z.string().email('Digite um e-mail válido'),
  steps: z.array(
    z.object({
      step: z.string().min(3, 'Selecione uma etapa'),
      status: z.string().min(3, 'Selecione um status'),
      data: z
        .string()
        .optional()
        .transform((data) => data || format(new Date(), 'yyyy-MM-dd')),
      description: z.string().optional(),
    }),
  ),
})

export type schemaCreateProjectProps = z.infer<typeof schema>

export default function CriarProjeto() {
  const {
    steps,
    moveCharacter,
    addStep,
    removeStep,
    isSubmitting,
    handleSubmitContact,
  } = useCreateProjectHook()

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<schemaCreateProjectProps>({
    resolver: zodResolver(schema),
  })

  console.log('errors', errors)

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="w-full flex justify-center items-center min-h-[calc(100vh-95.83px)]">
        <div className="w-full max-w-screen-xl px-4 xl:px-0 py-8 flex justify-center">
          <form
            className="w-full flex flex-col gap-16 items-center"
            onSubmit={handleSubmit(handleSubmitContact)}
          >
            <div className="w-full flex flex-col gap-4 max-w-screen-md">
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
              <div className="flex flex-col md:flex-row gap-8">
                <div className="text-center md:text-left flex flex-col gap-2 w-full">
                  <label
                    className="cursor-pointer font-bold text-xl"
                    htmlFor="nameClient"
                  >
                    Digite o nome do cliente
                  </label>
                  <input
                    type="text"
                    id="nameClient"
                    {...register('nameClient')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Nome do cliente"
                  />

                  {errors.nameClient && (
                    <p className="text-red-500 text-center lg:text-left font-medium text-sm">
                      {errors.nameClient.message}
                    </p>
                  )}
                </div>
                <div className="text-center md:text-left flex flex-col gap-2 w-full">
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
            </div>
            <ul className="characters flex gap-8 md:gap-4 flex-wrap flex-row items-start w-full">
              <div className="hidden lg:flex flex-col gap-6 items-center md:items-start w-fit">
                <h3 className="text-2xl font-bold">Etapa</h3>
                <h3 className="text-2xl font-bold">Status</h3>
                <h3 className="text-2xl font-bold">Data</h3>
                <h3 className="text-2xl font-bold">Descrição</h3>
              </div>
              {steps.map((step, index) => (
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
              <Button variant="secondary" title="Voltar" />
              <Button
                variant="primary"
                title="Criar projeto"
                isLoading={isSubmitting}
              />
            </div>
          </form>
        </div>
      </section>
    </DndProvider>
  )
}
