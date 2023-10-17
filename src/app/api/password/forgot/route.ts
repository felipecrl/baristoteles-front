interface ForgotPasswordProps {
  values: {
    email: string
  }
}

export async function forgotPassword({ values }: ForgotPasswordProps) {
  const res = await fetch(`http://localhost:3333/password/forgot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })

  return res
}
