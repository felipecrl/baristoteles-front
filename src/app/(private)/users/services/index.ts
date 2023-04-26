export async function getUsers() {
  const response = await fetch('https://baristoteles-api.onrender.com/users')
  
  const users = await response.json()

  return users?.users || []
}

export async function getUserById(userId: string) {
  const response = await fetch(`https://baristoteles-api.onrender.com/users/${userId}`)
  const user = await response.json()

  return user?.data
}
