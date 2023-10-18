import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import { SidebarNav } from '@/components/sidebarNav'
import { H2 } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Baristóteles | Admin - Gerenciar bares'
}

const menuItems = [
  {
    title: 'Lista de bares',
    href: '/admin/pubs'
  },
  {
    title: 'Novo bar',
    href: '/admin/pubs/create'
  }
]

export default async function AdminPubsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session && session.user.roles !== 'admin') {
    redirect('/home')
  }

  return (
    <>
      <H2 className="mb-8">GERENCIAR BARES</H2>
      <div className="flex flex-row space-y-8 lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={menuItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
