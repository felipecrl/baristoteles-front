import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getUserById } from '@/services/admin/users'

import { FormEditCreateUser } from '@/components/forms/formEditCreateUser'

export default async function EditUser({ params }: { params: { id: string } }) {
  const { id } = params
  const session = await getServerSession(authOptions)

  const response = await getUserById(session?.token, id)

  return <FormEditCreateUser token={session?.token} data={response} />
}
