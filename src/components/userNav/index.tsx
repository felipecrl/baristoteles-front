'use client'

import Link from 'next/link'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface UserNavProps {
  user:
    | {
        id: string
        name: string
        email: string
        roles: string
        avatar_url: string
      }
    | undefined
}

export default function UserNav({ user }: UserNavProps) {
  const router = useRouter()

  async function logout() {
    await signOut({
      redirect: false
    })

    router.replace('/')
  }

  return (
    <div className="space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar_url} alt={user?.name} />
              <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user?.roles === 'admin' && (
            <>
              <DropdownMenuGroup>
                <Link href="/admin/users">
                  <DropdownMenuItem>Gerenciar Usuários</DropdownMenuItem>
                </Link>
                <Link href="/admin/pubs">
                  <DropdownMenuItem>Gerenciar Bares</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}
          <Link href="/profile">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
