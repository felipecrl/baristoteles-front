'use client'

import { format } from 'date-fns'
import { Card, CardContent, CardImage, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FiInstagram } from 'react-icons/fi'

interface PubCardProps {
  data: PubsProps
}
interface PubsProps {
  id: string
  name: string
  address: string
  number: string
  neighborhood: string
  instagram: string
  recommendation: string
  cover: string
  date: string
}

export default function PubCard({ data }: PubCardProps) {
  const date = new Date(Date.parse(data.date))

  const openInstragram = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card>
      <CardImage className="relative">
        <div className="flex h-56 w-full items-end justify-end bg-[url('/images/bg-login.jpg')] bg-cover" />
        {data.instagram && (
          <Button
            variant="default"
            size="icon"
            className="absolute right-2 top-0"
            onClick={() => openInstragram(data.instagram)}
          >
            <FiInstagram className="h-5 w-5" />
          </Button>
        )}
      </CardImage>
      <CardContent>
        <CardTitle>{data.name}</CardTitle>
        <p className="mb-2 font-medium">{format(date, 'd/M/yyyy')}</p>
        <p>
          {data.address}, {data.number} - {data.neighborhood}
        </p>
      </CardContent>
    </Card>
  )
}
