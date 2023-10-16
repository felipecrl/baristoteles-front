'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const menu = [
  {
    name: 'Home',
    link: '/home'
  },
  {
    name: 'Sobre',
    link: '/about'
  },
  {
    name: 'Contato',
    link: '/contact'
  }
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="space-x-8">
      {menu.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className={cn(
            'transition-colors hover:text-primary',
            pathname?.startsWith(item.link)
              ? 'font-bold text-primary'
              : 'text-muted-foreground'
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
