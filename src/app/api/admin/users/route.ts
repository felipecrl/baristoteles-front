import { UsersProps } from '@/app/(logged)/admin/users/columns'

interface FetchUsersProps {
  per_page: number
  total: number
  current_page: number
  data: UsersProps[]
}

interface CreateUserProps {
  name: string
  email: string
  roles: string
  password?: string
}

interface UpdateUserProps {
  name: string
  email: string
  roles: string
}

export async function getData(
  token: string | undefined
): Promise<FetchUsersProps> {
  const res = await fetch('http://localhost:3333/users', {
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

export async function getUserById(
  token: string | undefined,
  id: string
): Promise<UsersProps> {
  const res = await fetch(`http://localhost:3333/users/${id}`, {
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

export async function createNewUser(
  token: string | undefined,
  values: CreateUserProps
): Promise<void> {
  await fetch(`http://localhost:3333/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
}

export async function updateUser(
  token: string | undefined,
  values: UpdateUserProps,
  id: string
): Promise<void> {
  await fetch(`http://localhost:3333/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })
}

export async function deleteUser(id: string): Promise<void> {
  await fetch(`http://localhost:3333/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
