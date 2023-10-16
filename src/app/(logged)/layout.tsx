import type { Metadata } from 'next'

import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Baristóteles | Home'
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main className="container mx-auto px-16 py-8">
        <section className="w-full rounded-lg bg-white p-6 pb-20 shadow">
          {children}
        </section>
      </main>

      <Footer />
    </>
  )
}
