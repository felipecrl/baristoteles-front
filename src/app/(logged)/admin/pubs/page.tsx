import { getServerSession } from 'next-auth'
import { format } from 'date-fns'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getData } from '@/services/admin/pubs'

import { columns } from './columns'
import { DataTable } from '@/components/dataTable'

export default async function AdminPubs() {
  const session = await getServerSession(authOptions)

  const response = await getData(session?.token)

  const { data } = response

  const formatedData = data.map((pub) => {
    const date = new Date(Date.parse(pub.date))
    const formatedDate = format(date, 'd/M/yyyy')
    return Object.assign(pub, { date: formatedDate })
  })

  return <DataTable columns={columns} data={formatedData} />
}
