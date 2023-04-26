export async function getUsers() {
  const response = await fetch('http://localhost:3333/users')
  
  const users = await response.json()

  return users?.users || []
}

export async function getUserById(userId: string) {
  const response = await fetch(`http://localhost:3333/users/${userId}`)
  const user = await response.json()

  return user?.data
}
