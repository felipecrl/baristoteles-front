interface ResetPasswordProps {
  token: string | null
  password: string
  password_confirmation: string
}

export async function resetPassword({
  token,
  password,
  password_confirmation
}: ResetPasswordProps) {
  const res = await fetch(`http://localhost:3333/password/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token, password, password_confirmation })
  })

  return res
}
