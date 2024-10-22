import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const fetchDeleteProject = async (id: string, key: string) => {
  const { data } = await api.delete(`/engsol/delete_project/?key=${key}`, {
    params: {
      id,
    },
  })

  return data
}

export const useDeleteProject = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: fetchDeleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-project'],
      })

      queryClient.invalidateQueries({
        queryKey: ['list-projects'],
      })

      toast.success('Projeto deletado com sucesso')
      router.push('/admin/dashboard')
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error.response.data.error)
    },
  })
}
