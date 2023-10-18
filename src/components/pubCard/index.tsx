import { Card, CardContent, CardImage, CardTitle } from '@/components/ui/card'

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
}

export default function PubCard({ data }: PubCardProps) {
  return (
    <Card>
      <CardImage>
        <div className="flex h-56 w-full items-end justify-end bg-[url('/images/bg-login.jpg')] bg-cover" />
      </CardImage>
      <CardContent>
        <CardTitle>{data.name}</CardTitle>
        <p>
          {data.address}, {data.number} - {data.neighborhood}
        </p>
      </CardContent>
    </Card>
  )
}
