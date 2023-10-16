import type { Metadata } from 'next'

import { SidebarNav } from '@/components/sidebarNav'
import { H2 } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Baristóteles | Admin - Gerenciar usuários'
}

const menuItems = [
  {
    title: 'Lista de usuários',
    href: '/admin/users'
  },
  {
    title: 'Novo usuário',
    href: '/admin/users/create'
  }
]

export default function AdminUsersLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <H2 className="mb-8">GERENCIAR USUÁRIOS</H2>
      <div className="flex flex-row space-y-8 lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={menuItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
