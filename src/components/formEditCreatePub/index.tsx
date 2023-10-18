'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

import { createNewPub, updatePub } from '@/app/api/admin/pubs/route'
import { PubsProps } from '@/app/(logged)/admin/pubs/columns'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Spiner from '@/components/spiner'

interface FormEditCreatePubProps {
  token: string | undefined
  data: PubsProps
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Campo obrigatório'
  }),
  address: z.string().min(1, {
    message: 'Campo obrigatório'
  }),
  number: z.string().min(1, {
    message: 'Campo obrigatório'
  }),
  neighborhood: z.string().min(1, {
    message: 'Campo obrigatório'
  }),
  instagram: z.string(),
  recommendation: z.string().min(1, {
    message: 'Campo obrigatório'
  })
})

export function FormEditCreatePub({ token, data }: FormEditCreatePubProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      address: data?.address,
      number: data?.number,
      neighborhood: data?.neighborhood,
      instagram: data?.instagram,
      recommendation: data?.recommendation
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    if (data) {
      await updatePub(token, values, data.id)
    } else {
      await createNewPub(token, values)
    }

    setIsLoading(false)

    router.replace('/admin/pubs')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Endereço" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input placeholder="Bairro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder="Número" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder="http://instagram.com/" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recommendation"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Recomendado por:</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} variant="default">
            {isLoading && <Spiner />}
            {!data ? 'Adicionar bar' : 'Salvar bar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
