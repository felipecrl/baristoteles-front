import { Button } from '@/components/ui/button'
import { H3, Paragraph } from '@/components/ui/typography'

interface BannersProps {
  title?: string
  subtitle?: string
  imgUrl?: string
  buttonLabel?: string
  buttonLink?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function Banners({
  title,
  subtitle,
  imgUrl,
  buttonLabel,
  buttonLink
}: BannersProps) {
  return (
    <div
      className={`h-64 overflow-hidden rounded-md bg-[url('${
        imgUrl ? imgUrl : ''
      }')] bg-cover bg-center`}
    >
      <div className="flex h-full items-center bg-gray-900 bg-opacity-50">
        <div className="max-w-xl px-10">
          <H3 className="text-white">{title}</H3>
          <Paragraph className="text-white">{subtitle}</Paragraph>
          {buttonLabel && (
            <Button
              className="mt-4 flex items-center rounded px-3 py-2 text-sm font-medium uppercase text-white  focus:outline-none"
              variant="default"
              onClick={buttonLink}
            >
              <span>{buttonLabel}</span>
              <svg
                className="mx-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
