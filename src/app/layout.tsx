import '../styles/globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Baristóteles',
  description: 'Implementando a filosofia de boteco'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="h-screen bg-[url('/images/bg-login.jpg')] bg-cover bg-fixed bg-no-repeat">
          {children}
        </section>
      </body>
    </html>
  )
}
