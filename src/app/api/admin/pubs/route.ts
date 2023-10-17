import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { PubsProps } from '@/app/(logged)/admin/pubs/columns'

type FetchPubsProps = {
  per_page: number
  total: number
  current_page: number
  data: PubsProps[]
}

export async function getData(): Promise<FetchPubsProps> {
  const session = await getServerSession(authOptions)

  if (!session) {
    // redirect to login
  }

  const token = session?.token

  const res = await fetch('http://localhost:3333/pubs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    next: { revalidate: 0 }
  })

  if (!res.ok) {
    // redirect to 500 page
  }

  const data = await res.json()

  return data
}
