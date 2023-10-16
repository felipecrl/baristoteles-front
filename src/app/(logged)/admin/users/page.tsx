import { UsersProps, columns } from './columns'
import { DataTable } from '@/components/dataTable'

async function getData(): Promise<UsersProps[]> {
  return [
    {
      id: '728ed52f',
      name: 'José Coelho',
      email: 'jose@example.com',
      role: 'user'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    },
    {
      id: '728ed3gf',
      name: 'Felipe Coelho',
      email: 'felipe@example.com',
      role: 'admin'
    }
  ]
}

export default async function ListUsers() {
  const data = await getData()

  return <DataTable columns={columns} data={data} />
}
