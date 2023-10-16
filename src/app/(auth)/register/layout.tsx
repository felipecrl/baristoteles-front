import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Baristóteles | Registro de usuário'
}

export default function RegisterLayout({
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
