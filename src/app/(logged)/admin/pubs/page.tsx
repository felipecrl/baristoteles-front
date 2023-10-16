import { PubsProps, columns } from './columns'
import { DataTable } from '@/components/dataTable'

async function getData(): Promise<PubsProps[]> {
  return [
    {
      id: 'efr342f3f',
      name: 'Bar do zé',
      address: 'Rua teste',
      number: '23',
      neighborhood: 'Gutierrez',
      instagram: 'http://www.instagram.com/felipecrl',
      recommendation: 'Felipe Coelho'
    },
    {
      id: '4334r342f3f',
      name: 'Bar da Lu',
      address: 'Rua teste',
      number: '23',
      neighborhood: 'Gutierrez',
      instagram: 'http://www.instagram.com/felipecrl',
      recommendation: 'José Luiz'
    },
    {
      id: 'efwefr342f3f',
      name: 'Bar da Maria',
      address: 'Rua teste',
      number: '23',
      neighborhood: 'Gutierrez',
      instagram: 'http://www.instagram.com/felipecrl',
      recommendation: 'Vinicius Lessa'
    },
    {
      id: 'efwefr342f3f',
      name: 'Bar do João',
      address: 'Rua teste',
      number: '23',
      neighborhood: 'Gutierrez',
      instagram: 'http://www.instagram.com/felipecrl',
      recommendation: 'Thiago Testa'
    },
    {
      id: 'efdsfsdfdr342f3f',
      name: 'Bar do Fresquinho',
      address: 'Rua teste',
      number: '23',
      neighborhood: 'Gutierrez',
      instagram: 'http://www.instagram.com/felipecrl',
      recommendation: 'Leonardo Ghudor'
    }
  ]
}

export default async function AdminPubs() {
  const data = await getData()

  return <DataTable columns={columns} data={data} />
}
