import { ICreateProjectParams } from '@/@types/project'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const fetchCreateProject = async (params: ICreateProjectParams) => {
  const { data } = await api.post(`/engsol/create_project`, {
    ...params,
  })

  return data
}

export const useCreateProject = () => {
  return useMutation({
    mutationFn: fetchCreateProject,
    onSuccess: () => {
      toast.success('Projeto criado com sucesso')

      queryClient.invalidateQueries({
        queryKey: ['list-projects'],
      })
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error.response.data.error)
    },
  })
}
