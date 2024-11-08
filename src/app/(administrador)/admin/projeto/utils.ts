import { ICreateProjectParams, IResponseGetProject } from '@/@types/project'
import toast from 'react-hot-toast'

export function formatedProject(
  data: IResponseGetProject,
): ICreateProjectParams {
  return {
    project: {
      id: data.project.id,
      name: data.project.name,
    },

    client: {
      name: data.client.name,
      email: data.client.email,
    },
    timeline: data.timeline.map((step, index) => ({
      ranking: {
        id: Number(step.ranking.id) || 0,
        rank: String(index + 1),
        last_update: step.ranking.last_update,
        note: step.ranking.note,
        description: step.ranking.description,
        condition: {
          id: Number(step.ranking.condition.id),
        },
      },
    })),
  }
}

export function validateProject(data: IResponseGetProject) {
  if (!data.project.name) {
    toast.error('O nome do projeto é obrigatório')
    return
  }

  if (!data.client.name) {
    toast.error('O nome do cliente é obrigatório')
    return
  }

  if (!data.client.email) {
    toast.error('O e-mail do cliente é obrigatório')
    return
  }

  if (!data.timeline.length) {
    toast.error('É necessário adicionar pelo menos uma etapa')
    // eslint-disable-next-line no-useless-return
    return
  }
}
