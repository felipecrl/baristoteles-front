import { getServerSession } from 'next-auth'
import { isFuture, isPast } from 'date-fns'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getData } from '@/services/home'

import { H2, Paragraph } from '@/components/ui/typography'
import Banners from '@/components/banners'
import PubCard from '@/components/pubCard'
import { FormNewsletter } from '@/components/forms/formNewsletter'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const response = await getData(session?.token)

  const { data } = response

  const renderNextPubs = () => {
    const filterPubs = data.filter((pub) =>
      isFuture(new Date(Date.parse(pub.date)))
    )

    return filterPubs.map((pub) => <PubCard key={pub.id} data={pub} />)
  }

  const renderLastPubs = () => {
    const filterPubs = data.filter((pub) =>
      isPast(new Date(Date.parse(pub.date)))
    )

    return filterPubs.map((pub) => <PubCard key={pub.id} data={pub} />)
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

      <div className="mt-16 flex space-x-12">
        <div>
          <H2 className="mb-6">Newsletter</H2>
          <Paragraph className="mb-6">
            Quer ficar por dentro do melhores bares de BH? Assine nossa
            newsletter.
          </Paragraph>

          <FormNewsletter />
        </div>
        <div>
          <H2 className="mb-6">Indique</H2>
          <Paragraph className="mb-6">
            Indique um bar para que possamos ir, e junte-se a nós!
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
