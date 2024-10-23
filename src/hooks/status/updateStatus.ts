import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const fetchUpdateStatus = async (id: string, name: string) => {
  const { data } = await api.put(`/engsol/update_condition`, {
    id,
    name,
  })

  return data
}

export const useUpdateStatus = (key: string) => {
  return useMutation({
    mutationFn: fetchUpdateStatus,
    onSuccess: () => {
      toast.success('Status editado com sucesso')
      queryClient.invalidateQueries({
        queryKey: ['get-status', key],
      })

      queryClient.invalidateQueries({
        queryKey: ['list-status', key],
      })
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error.response.data.error)
    },
  })
}
