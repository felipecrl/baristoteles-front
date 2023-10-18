import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import { FormEditCreateUser } from '@/components/forms/formEditCreateUser'

export default async function CreateUsers() {
  const session = await getServerSession(authOptions)

  return <FormEditCreateUser token={session?.token} />
}
