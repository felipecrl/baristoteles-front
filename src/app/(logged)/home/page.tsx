import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getData } from '@/app/api/home/route'

import { H2, Paragraph } from '@/components/ui/typography'
import Banners from '@/components/banners'
import PubCard from '@/components/pubCard'
import { FormNewsletter } from '@/components/forms/formNewsletter'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const response = await getData(session?.token)

  const { data } = response

  console.log(data)

  const renderNextPubs = () => {
    const nextPubs = data.map((pub) => <PubCard key={pub.id} data={pub} />)
    return nextPubs
  }

  const renderLastPubs = () => {
    const lastPubs = data.map((pub) => <PubCard key={pub.id} data={pub} />)
    return lastPubs
  }

  return (
    <>
      <Banners
        title="Lorem ipsum"
        subtitle="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
        buttonLabel="Action button"
        imgUrl="/images/bg-login.jpg"
      />

      <div className="mt-16">
        <H2>Próximos Bares</H2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {renderNextPubs()}
        </div>
      </div>

      <div className="mt-16">
        <H2>Últimos Bares Visitados</H2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {renderLastPubs()}
        </div>
      </div>

      <div className="mt-16 flex space-x-16">
        <div>
          <H2 className="mb-6">Newsletter</H2>
          <Paragraph className="mb-6">
            Quer ficar por dentro do melhores bares de BH? Assine nossa
            newsletter.
          </Paragraph>

          <FormNewsletter />
        </div>
        <div>
          <H2 className="mb-6">Redes Sociais</H2>
          <Paragraph className="mb-6">
            Siga-nos em nossas redes sociais
          </Paragraph>
        </div>
      </div>
    </>
  )
}
