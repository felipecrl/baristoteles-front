import { Card, CardContent, CardImage, CardTitle } from '@/components/ui/card'

export default function PubCard() {
  return (
    <Card>
      <CardImage>
        <div className="flex h-56 w-full items-end justify-end bg-[url('/images/bg-login.jpg')] bg-cover" />
      </CardImage>
      <CardContent>
        <CardTitle>Card Title</CardTitle>
        <p>Card Content</p>
      </CardContent>
    </Card>
  )
}
