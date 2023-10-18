import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getPubById } from '@/app/api/admin/pubs/route'

import { FormEditCreatePub } from '@/components/forms/formEditCreatePub'

export default async function EditPub({ params }: { params: { id: string } }) {
  const { id } = params
  const session = await getServerSession(authOptions)

  const response = await getPubById(session?.token, id)

  return <FormEditCreatePub token={session?.token} data={response} />
}
