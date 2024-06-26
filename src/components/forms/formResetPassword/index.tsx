'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { ExclamationTriangleIcon, RocketIcon } from '@radix-ui/react-icons'

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
import Spiner from '@/components/spiner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { resetPassword } from '@/services/password/reset'

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
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formError, setFormError] = useState<boolean>(false)
  const [formSuccess, setFormSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const token = searchParams.get('token')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      password_confirmation: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const payload = {
      token,
      password: values.password,
      password_confirmation: values.password_confirmation
    }

    const result = await resetPassword(payload)

    if (!result.ok) {
      setFormError(true)
      setIsLoading(false)
      return
    }

    setFormSuccess(true)
    setIsLoading(false)
  }

  return (
    <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="p-8">
        <H1 className="mb-6 flex justify-center font-semibold">Baristóteles</H1>
        <H2 className="mb-8 flex justify-center border-0">
          Recuperação de senha
        </H2>

        {formError && (
          <Alert variant="destructive" className="mb-6">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Senha errada ou token expirado. Tente novamente!
            </AlertDescription>
          </Alert>
        )}

        {!formSuccess ? (
          <>
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
                        <Input
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
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
                        <Input
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
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
                  Enviar
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            <Alert className="mb-6">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Cheers!</AlertTitle>
              <AlertDescription>
                Senha alterada com sucesso, retorne a página de login e refaça
                seu login.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full"
              type="button"
              onClick={() => router.replace('/login')}
            >
              Voltar para login
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
