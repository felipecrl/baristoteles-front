import { getServerSession } from 'next-auth'
import { parseISO } from 'date-fns'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getPubById } from '@/services/admin/pubs'

import { FormEditCreatePub } from '@/components/forms/formEditCreatePub'

export default async function EditPub({ params }: { params: { id: string } }) {
  const { id } = params
  const session = await getServerSession(authOptions)

  const response = await getPubById(session?.token, id)

  const parseDate = parseISO(response.date)

  const data = {
    ...response,
    date: parseDate
  }

  return <FormEditCreatePub token={session?.token} data={data} />
}
