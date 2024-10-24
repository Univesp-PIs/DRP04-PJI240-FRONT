'use client'

import { IResponseListProjects } from '@/@types/project'
import { Button } from '@/components/Button'
import { AdminContext } from '@/contexts/AdminContext'
import { useListProjects } from '@/hooks/projects/listProjects'
import { useContext, useEffect, useState } from 'react'

export default function Dashboard() {
  const [projects, setProjects] = useState<IResponseListProjects[]>([])
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof IResponseListProjects
    direction: string
  } | null>(null)

  const {
    data: dataListProjects,
    isLoading: isLoadingListProjects,
    error: errorListCurriculums,
  } = useListProjects()

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

  const filteredProjects = projects.filter((project: IResponseListProjects) =>
    project.client.name.toLowerCase().includes(search.toLowerCase()) || project.project.name.toLowerCase().includes(search.toLowerCase()) || project.project.key.toLowerCase().includes(search.toLowerCase())
  )

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
    }
    return 0
  })

  const requestSort = (key: keyof IResponseListProjects) => {
    let direction = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  console.log('dataListProjects', dataListProjects)

  return (
    <section className="w-full flex justify-center min-h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl flex-col px-4 xl:px-0 py-4 flex gap-4">
        <div className="flex w-full justify-end">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={handleSearch}
            className="border rounded p-2 w-1/3"
          />
        </div>

        <table className="min-w-full white border border-black">
          <thead>
            <tr className="bg-[#D9D9D9]">
              <th
                onClick={() => requestSort('project')}
                className="py-2 px-4 text-left cursor-pointer"
              >
                Projetos
              </th>
              <th
                // onClick={() => requestSort('status')}
                className="py-2 px-4 text-left cursor-pointer"
              >
                Etapa
              </th>
              <th
                // onClick={() => requestSort('email')}
                className="py-2 px-4 text-left cursor-pointer"
              >
                Email
              </th>
              <th
                // onClick={() => requestSort('accessKey')}
                className="py-2 px-4 text-left cursor-pointer"
              >
                Chave de Acesso
              </th>
              <th className="py-2 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => (
              <tr key={project.project.id} className="border-t border-black">
                <td className="py-2 px-4">{project.project.name}</td>
                <td className="py-2 px-4">{project.project.name}</td>
                <td className="py-2 px-4">{project.client.email}</td>
                <td className="py-2 px-4">{project.project.key}</td>
                <td className="py-2 px-4 flex gap-4">
                  <Button title="Enviar Email" />
                  <Button title="Editar" />
                  <Button title="Excluir" variant="error" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
