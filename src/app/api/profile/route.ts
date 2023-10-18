interface FetchProfile {
  id: string
  name: string
  email: string
  roles: string
  avatar_url: string
}

interface UpdateProfile {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
  old_password?: string
}

export async function getData(
  token: string | undefined
): Promise<FetchProfile> {
  const res = await fetch('http://localhost:3333/profile', {
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

export async function updateProfile(
  token: string | undefined,
  values: UpdateProfile
): Promise<void> {
  const res = await fetch(`http://localhost:3333/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(values)
  })

  console.log(res)

  if (!res.ok) {
    // redirect to 500 page
  }
}
