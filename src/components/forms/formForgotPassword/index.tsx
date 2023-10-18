'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { RocketIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Spiner from '@/components/spiner'

import { forgotPassword } from '@/app/api/password/forgot/route'

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

export default function FormForgotPassword() {
  const router = useRouter()
  const [formSuccess, setFormSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    await forgotPassword({ values: values })

    setIsLoading(false)
    setFormSuccess(true)
  }

  return (
    <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="p-8">
        <H1 className="mb-6 flex justify-center font-semibold">Baristóteles</H1>
        <H2 className="mb-8 flex justify-center border-0">
          Recuperação de senha
        </H2>

        {!formSuccess ? (
          <>
            <Paragraph className="mb-4 flex justify-start text-sm leading-tight tracking-tight text-gray-900 dark:text-white">
              Digite o e-mail cadastrado para recuperar sua senha.
            </Paragraph>

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
                <div className="flex justify-end">
                  <Link
                    href="/login"
                    className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                  >
                    Voltar para login
                  </Link>
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  variant="default"
                  disabled={isLoading}
                >
                  {isLoading && <Spiner />}
                  Enviar
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Cheers!</AlertTitle>
              <AlertDescription>
                Você receberá um e-mail com as instruções para resetar a sua
                senha. Caso não receba o e-mail, verifique sua caixa de spam.
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => router.replace('/login')}
              className="mt-6 w-full"
              type="button"
              variant="default"
            >
              Voltar para login
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
