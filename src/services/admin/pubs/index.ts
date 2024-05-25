import { PubsProps } from '@/app/(logged)/admin/pubs/columns'

interface FetchPubsProps {
  per_page: number
  total: number
  current_page: number
  data: PubsProps[]
}

interface CreatePubProps {
  name: string
  address: string
  number: string
  neighborhood: string
  instagram: string
  recommendation: string
  date: string
}

interface UpdatePubProps {
  name: string
  address: string
  number: string
  neighborhood: string
  instagram: string
  recommendation: string
  date: string
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

export async function getPubById(
  token: string | undefined,
  id: string
): Promise<PubsProps> {
  const res = await fetch(`http://localhost:3333/pubs/${id}`, {
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

export async function createNewPub(
  token: string | undefined,
  values: CreatePubProps
): Promise<void> {
  await fetch(`http://localhost:3333/pubs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
}

export async function updatePub(
  token: string | undefined,
  values: UpdatePubProps,
  id: string
): Promise<void> {
  await fetch(`http://localhost:3333/pubs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
}

export async function deletePub(id: string): Promise<void> {
  await fetch(`http://localhost:3333/pubs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
