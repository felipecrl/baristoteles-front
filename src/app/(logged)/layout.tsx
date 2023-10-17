import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import Header from '@/components/header'
import Footer from '@/components/footer'

import NextAuthSessionProvider from '@/providers/sessionProviders'

export const metadata: Metadata = {
  title: 'Baristóteles | Home'
}

export default async function AppLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <NextAuthSessionProvider>
      <Header />

      <main className="container mx-auto px-16 py-8">
        <section className="w-full rounded-lg bg-white p-6 pb-20 shadow">
          {children}
        </section>
      </main>

      <Footer />
    </NextAuthSessionProvider>
  )
}
