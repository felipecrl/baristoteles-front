import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getData } from '@/services/profile'

import { H2 } from '@/components/ui/typography'

import { FormProfile } from '@/components/forms/formProfile'

export default async function Profile() {
  const session = await getServerSession(authOptions)

  const response = await getData(session?.token)

  return (
    <>
      <H2 className="mb-8">PERFIL</H2>
      <FormProfile token={session?.token} data={response} />
    </>
  )
}
