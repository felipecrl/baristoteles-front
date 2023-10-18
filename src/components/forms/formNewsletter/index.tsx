'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Campo obrigatório'
    })
    .email({
      message: 'E-mail inválido'
    })
})

export function FormNewsletter() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="flex">
              <FormItem>
                <FormControl>
                  <Input placeholder="Seu e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button type="submit" className="ml-6">
                Assinar
              </Button>
            </div>
          )}
        />
      </form>
    </Form>
  )
}
