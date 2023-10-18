import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getData } from '@/app/api/admin/pubs/route'

import { columns } from './columns'
import { DataTable } from '@/components/dataTable'

export default async function AdminPubs() {
  const session = await getServerSession(authOptions)

  const response = await getData(session?.token)

  const { data } = response

  return <DataTable columns={columns} data={data} />
}
