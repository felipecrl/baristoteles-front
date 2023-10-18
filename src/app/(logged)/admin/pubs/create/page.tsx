import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import { FormEditCreatePub } from '@/components/forms/formEditCreatePub'

export default async function CreatePubs() {
  const session = await getServerSession(authOptions)

  return <FormEditCreatePub token={session?.token} />
}
