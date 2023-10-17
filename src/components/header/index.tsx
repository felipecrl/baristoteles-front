import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import UserNav from '@/components/userNav'
import Nav from '@/components/nav'

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className="container mx-auto px-16 pt-5">
      <div className="flex h-20 items-center justify-between rounded-lg bg-white p-6 shadow">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Baristóteles
        </div>

        <Nav />

        <UserNav user={session?.user || undefined} />
      </div>
    </header>
  )
}
