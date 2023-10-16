import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Baristóteles | Login'
}

export default function AuthLayout({
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
