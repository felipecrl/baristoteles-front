import { columns } from './columns'
import { DataTable } from '@/components/dataTable'

import { getData } from '@/app/api/admin/pubs/route'

export default async function AdminPubs() {
  const response = await getData()
  const { data } = response

  return <DataTable columns={columns} data={data} />
}
