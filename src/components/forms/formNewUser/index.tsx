'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

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
import { H1, H2 } from '@/components/ui/typography'
import Spiner from '@/components/spiner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { createUser } from '@/app/api/register/route'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Campo obrigatório'
  }),
  email: z.string().min(1, { message: 'Campo obrigatório' }).email({
    message: 'E-mail inválido'
  }),
  password: z
    .string()
    .min(8, {
      message: 'Campo obrigatório. Mínimo 8 caracteres'
    })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, {
      message:
        'Senha deve conter: mínimo 8 caracteres, números, caracteres especiais, letras maiúsculas e minúsculas'
    })
})

export function FormNewUser() {
  const router = useRouter()
  const [formError, setFormError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const newValues = {
      ...values,
      roles: 'user'
    }

    const result = await createUser({ values: newValues })

    const data = await result.json()

    if (data?.status === 'error') {
      setFormError(true)
      setIsLoading(false)
      return
    }

    router.replace('/login')
  }

  return (
    <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="p-8">
        <H1 className="mb-6 flex justify-center font-semibold">Baristóteles</H1>
        <H2 className="mb-8 flex justify-center border-0">
          Criar novo usuário
        </H2>

        {formError && (
          <Alert variant="destructive" className="mb-6">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Já existe um usuário cadastrado com este e-mail.
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="nome@dominio.com.br" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              variant="default"
              disabled={isLoading}
            >
              {isLoading && <Spiner />}
              Registrar
            </Button>
            <div className="flex justify-center">
              <Link
                href="login"
                className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
              >
                Voltar para login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
