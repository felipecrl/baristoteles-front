'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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
import { H1, H2, Paragraph } from '@/components/ui/typography'

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: 'Campo obrigatório. Mínimo 8 caracteres'
      })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, {
        message:
          'Senha deve conter: mínimo 8 caracteres, números, caracteres especiais, letras maiúsculas e minúsculas'
      }),
    password_confirmation: z.string().min(8, {
      message: 'Campo obrigatório. Mínimo 8 caracteres'
    })
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Senhas não são iguais',
    path: ['password_confirmation']
  })

export default function FormResetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      password_confirmation: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="p-8">
        <H1 className="mb-6 flex justify-center font-semibold">Baristóteles</H1>
        <H2 className="mb-8 flex justify-center border-0">
          Recuperação de senha
        </H2>
        <Paragraph className="mb-4 flex justify-start text-sm leading-tight tracking-tight text-gray-900 dark:text-white">
          Digite sua nova senha.
        </Paragraph>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" variant="default">
              Enviar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
