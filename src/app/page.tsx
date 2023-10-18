import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="container bg-white">
      <div className="flex justify-end">
        <Link href="/login">
          <Button type="button">Entrar</Button>
        </Link>
      </div>
      LANDINGPAGE
    </div>
  )
}
