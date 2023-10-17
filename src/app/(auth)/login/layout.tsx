import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'Baristóteles | Login'
}

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/home')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {children}
    </div>
  )
}
