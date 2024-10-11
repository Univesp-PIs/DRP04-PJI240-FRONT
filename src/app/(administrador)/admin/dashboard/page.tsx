'use client'

import { useState } from 'react'
import { useReactTable } from '@tanstack/react-table'

const DATA = [
  {
    title: 'projeto 123',
    status: 'Em andamento',
    email: 'johndoe@gmail.com',
    key: '2349423-23423',
  },
  {
    title: 'projeto 4321',
    status: 'Em andamento',
    email: 'johndoe@gmail.com',
    key: '2349423-23423',
  },
]

const columns = [
  {
    accessorKey: 'project',
    header: 'Projetos',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'project',
    header: 'Projetos',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'project',
    header: 'Projetos',
    cell: (props) => <p>{props.getValue()}</p>,
  },
]

// export default function Dashboard() {
//   const [data, setData] = useState(DATA)
//   const table = useReactTable({
//     data,
//     columns,
//   })

//   return (

//   )
// }
