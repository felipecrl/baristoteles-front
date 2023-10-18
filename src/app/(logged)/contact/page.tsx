import Banners from '@/components/banners'
import { FormContact } from '@/components/forms/formContact'
import { H2, H3, Paragraph } from '@/components/ui/typography'

export default function Contact() {
  return (
    <>
      <Banners imgUrl="/images/bg-login.jpg" />

      <H2 className="my-16">Entre em contato</H2>

      <div className="grid grid-cols-2 gap-16">
        <div>
          <H3 className="mb-3">Lorem Ipsum</H3>
          <Paragraph className="mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            turpis ex, scelerisque eu dapibus vitae, vehicula vel lectus.
          </Paragraph>

          <H3 className="mb-3">Lorem Ipsum</H3>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            turpis ex, scelerisque eu dapibus vitae, vehicula vel lectus.
          </Paragraph>
        </div>
        <FormContact />
      </div>
    </>
  )
}
