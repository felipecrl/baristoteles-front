import { H2, Paragraph } from '@/components/ui/typography'
import Banners from '@/components/banners'
import PubCard from '@/components/pubCard'
import { FormNewsletter } from '@/components/formNewsletter'

export default function Home() {
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
          <PubCard />
          <PubCard />
        </div>
      </div>

      <div className="mt-16">
        <H2>Últimos Bares Visitados</H2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PubCard />
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
