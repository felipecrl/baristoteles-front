interface CreateUserProps {
  values: {
    name: string
    email: string
    password: string
    roles: string
  }
}

export async function createUser({ values }: CreateUserProps) {
  const res = await fetch(`http://localhost:3333/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })

  return res
}
