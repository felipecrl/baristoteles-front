import { PubsProps } from '@/app/(logged)/admin/pubs/columns'

interface FetchPubsProps {
  per_page: number
  total: number
  current_page: number
  data: PubsProps[]
}

export async function getData(
  token: string | undefined
): Promise<FetchPubsProps> {
  const res = await fetch('http://localhost:3333/pubs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    // redirect to 500 page
  }

  const data = await res.json()

  return data
}
