import '../../styles/globals.css'

export const metadata = {
  title: 'Baristóteles - Implementando a filosofia de buteco',
  description: 'Projeto Beta para uma ranqueamento de butecos de Belo Horizonte',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full bg-white'>
      <body>
        {children}
      </body>
    </html>
  )
}
