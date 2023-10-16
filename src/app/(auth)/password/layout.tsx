import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Baristóteles | Recuperação de senha'
}

export default function PasswordLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {children}
    </div>
  )
}
