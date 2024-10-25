'use client'

import { IResponseListProjects } from '@/@types/project'
import { Button } from '@/components/Button'
import { ModalGeneric } from '@/components/Modal'
import { AdminContext } from '@/contexts/AdminContext'
import { useListProjects } from '@/hooks/projects/listProjects'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6'
import { HiOutlineRefresh } from 'react-icons/hi'

export default function Dashboard() {
  const [projects, setProjects] = useState<IResponseListProjects[]>([])
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key:
      | keyof IResponseListProjects['project']
      | keyof IResponseListProjects['client']
    direction: 'ascending' | 'descending' | null
  } | null>(null)

  const {
    data: dataListProjects,
    isLoading: isLoadingListProjects,
    error: errorListCurriculums,
    isFetching: isFetchingListProjects,
    refetch: refetchListProjects,
  } = useListProjects()

  const router = useRouter()

  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader('Painel do Administrador')
  }, [setTitleHeader])

  useEffect(() => {
    if (dataListProjects) {
      setProjects(dataListProjects)
    }
  }, [dataListProjects])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredProjects = projects.filter(
    (project: IResponseListProjects) =>
      project.client.name.toLowerCase().includes(search.toLowerCase()) ||
      project.project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.project.key.toLowerCase().includes(search.toLowerCase()),
  )

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortConfig !== null) {
      const aKey =
        sortConfig.key === 'name' || sortConfig.key === 'key'
          ? a.project[sortConfig.key]
          : a.client[sortConfig.key as keyof IResponseListProjects['client']]
      const bKey =
        sortConfig.key === 'name' || sortConfig.key === 'key'
          ? b.project[sortConfig.key]
          : b.client[sortConfig.key as keyof IResponseListProjects['client']]
      if (aKey < bKey) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (aKey > bKey) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
    }
    return 0
  })

  const requestSort = (
    key:
      | keyof IResponseListProjects['project']
      | keyof IResponseListProjects['client'],
  ) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (
    key:
      | keyof IResponseListProjects['project']
      | keyof IResponseListProjects['client'],
  ) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    if (sortConfig.direction === 'ascending') {
      return <FaArrowUp className="inline ml-1" />
    }
    return <FaArrowDown className="inline ml-1" />
  }

  return (
    <section className="w-full flex justify-center min-h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl flex-col px-4 xl:px-0 py-4 flex gap-4">
        <div className="flex w-full justify-end items-center gap-8">
          <HiOutlineRefresh
            size={25}
            title="Atualizar Projetos"
            className={`cursor-pointer ${isFetchingListProjects || isLoadingListProjects ? 'animate-spin' : ''}`}
            onClick={() => refetchListProjects()}
          />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md font-bold outline-none w-fit"
          />
        </div>

        <table className="min-w-full white border border-black">
          <thead>
            <tr className="bg-[#D9D9D9]">
              <th
                onClick={() => requestSort('name')}
                className="py-2 px-4 text-left cursor-pointer"
              >
                Projetos {getSortIcon('name')}
              </th>
              {/* <th
                // onClick={() => requestSort('status')}
                className="py-2 px-4 text-left cursor-pointer"
              >
                Etapa
              </th> */}
              <th
                // onClick={() => requestSort('email')}
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => requestSort('email')}
              >
                Email {getSortIcon('email')}
              </th>
              <th
                onClick={() => requestSort('key')}
                className="py-2 px-4 text-left cursor-pointer"
              >
                Chave de Acesso {getSortIcon('key')}
              </th>
              <th className="py-2 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingListProjects ? (
              Array.from({ length: 7 }).map((_, index) => (
                <tr key={index} className="animate-pulse py-2">
                  <td colSpan={4}>
                    <div className="py-2 px-4 h-14 w-full bg-slate-300" />
                  </td>
                </tr>
              ))
            ) : errorListCurriculums ? (
              <tr>
                <td colSpan={4} className="py-2 px-4 text-center">
                  Erro ao carregar os projetos
                </td>
              </tr>
            ) : sortedProjects.length > 0 ? (
              sortedProjects.map((project) => (
                <tr key={project.project.id} className="border-t border-black">
                  <td className="py-2 px-4">{project.project.name}</td>
                  {/* <td className="py-2 px-4">{project.project.name}</td> */}
                  <td className="py-2 px-4">{project.client.email}</td>
                  <td className="py-2 px-4">{project.project.key}</td>
                  <td className="py-2 px-4 flex gap-4">
                    <Button title="Enviar Email" />
                    <Button title="Editar" />
                    <ModalGeneric
                      title="Excluir Projeto"
                      button={<Button title="Excluir" variant="error" />}
                      description="Tem certeza que deseja excluir o projeto? Essa ação não poderá ser desfeita."
                      onConfirm={() => console.log('Excluir')}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-2 px-4 text-center">
                  Nenhum projeto encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex gap-4 w-full justify-center">
          <Button
            title="Criar Projeto"
            variant="primary"
            onClick={() => router.push('/admin/projeto/criar')}
          />
          <Button
            title="Criar status"
            onClick={() => router.push('/admin/status')}
          />
        </div>
      </div>
    </section>
  )
}
