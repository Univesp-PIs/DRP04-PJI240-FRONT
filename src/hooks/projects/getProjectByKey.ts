'use client'
import { IResponseGetProject } from '@/@types/project'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchGetProjectByKey = async (
  key: string,
): Promise<IResponseGetProject> => {
  const { data } = await api.get<IResponseGetProject>(
    '/engsol/search_project',
    {
      params: {
        key,
      },
    },
  )

  return data
}

export const useGetProjectByKey = (key: string) => {
  return useQuery({
    queryKey: ['get-project', key],
    queryFn: () => fetchGetProjectByKey(key),
  })
}
