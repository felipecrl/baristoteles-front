'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Spiner from '@/components/spiner'

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Campo obrigatório'
    })
    .email({
      message: 'E-mail inválido'
    }),
  password: z.string().min(1, {
    message: 'Campo obrigatório'
  })
})

export default function FormLogin() {
  const router = useRouter()
  const [formError, setFormError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (result?.error) {
      setFormError(true)
      setIsLoading(false)
      return
    }

    router.replace('/home')
  }

  return (
    <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="p-8">
        <H1 className="mb-6 flex justify-center font-semibold">Baristóteles</H1>
        <H2 className="mb-8 flex justify-center border-0">
          Faça login em sua conta
        </H2>

        {formError && (
          <Alert variant="destructive" className="mb-6">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>Login ou senha inválidos.</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Seu e-mail</FormLabel>
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
            <div className="flex justify-end">
              <Link
                href="password/forgot"
                className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Button
              className="w-full"
              type="submit"
              variant="default"
              disabled={isLoading}
            >
              {isLoading && <Spiner />}
              Entrar
            </Button>
            <div className="flex justify-center">
              <Link
                href="register"
                className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
              >
                Não tem uma conta? Cadastre-se aqui!
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
