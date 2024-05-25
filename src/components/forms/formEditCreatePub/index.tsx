'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format, formatISO } from 'date-fns'
import { cn } from '@/lib/utils'

import { createNewPub, updatePub } from '@/services/admin/pubs'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
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
import { Calendar } from '@/components/ui/calendar'

export type PubsProps = {
  id: string
  name: string
  address: string
  number: string
  neighborhood: string
  instagram: string
  recommendation: string
  cover: string
  date: Date
}
interface FormEditCreatePubProps {
  token: string | undefined
  data?: PubsProps
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
  }),
  date: z.date({
    required_error: 'A date of birth is required.'
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
      recommendation: data?.recommendation,
      date: data?.date
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const newValues = {
      ...values,
      date: formatISO(values.date).toString()
    }

    if (data) {
      await updatePub(token, newValues, data.id)
    } else {
      await createNewPub(token, newValues)
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
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'd/M/yyyy')
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>

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
