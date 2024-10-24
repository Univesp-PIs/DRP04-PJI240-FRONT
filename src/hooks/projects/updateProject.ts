import { IUpdateProjectParams } from '@/@types/project'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const fetchUpdateProject = async (params: IUpdateProjectParams) => {
  const { data } = await api.put(`/engsol/update_project`, {
    ...params,
  })

  return data
}

export const useUpdateProject = (key: string) => {
  return useMutation({
    mutationFn: fetchUpdateProject,
    onSuccess: () => {
      toast.success('Projeto editado com sucesso')
      queryClient.invalidateQueries({
        queryKey: ['get-project', key],
      })

      queryClient.invalidateQueries({
        queryKey: ['list-projects', key],
      })
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error.response.data.error)
    },
  })
}
