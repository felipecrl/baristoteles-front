'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'

import { updateProfile } from '@/app/api/profile/route'

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
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TooltipCustom } from '@/components/tooltip'
import { AvatarProfile } from '@/components/avatarProfile'

interface UserProps {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface FormProfileProps {
  token: string | undefined
  data: UserProps
}

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Campo obrigatório'
    }),
    email: z.string().min(1, { message: 'Campo obrigatório' }).email({
      message: 'E-mail inválido'
    }),
    password: z.string(),
    password_confirmation: z.string(),
    old_password: z.string()
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Senhas não são iguais',
    path: ['password_confirmation']
  })

export function FormProfile({ token, data }: FormProfileProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [editProfile, setEditProfile] = useState<boolean>(true)
  const [editPassword, setEditPassword] = useState<boolean>(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      password: '',
      password_confirmation: '',
      old_password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const newValues = {
      name: values.name,
      email: values.email
    }

    await updateProfile(token, !editProfile ? newValues : values)

    setEditProfile(true)
    setEditPassword(true)

    setIsLoading(false)
  }

  return (
    <Card className="relative m-auto w-[550px]">
      <CardHeader>
        <AvatarProfile data={data} />
        <TooltipCustom message="Editar">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-12 top-0"
            onClick={() => setEditProfile((prevCheck) => !prevCheck)}
          >
            <AiOutlineEdit className="h-4 w-4" />
          </Button>
        </TooltipCustom>
        <TooltipCustom message="Alterar senha">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-0"
            onClick={() => setEditPassword((prevCheck) => !prevCheck)}
          >
            <RiLockPasswordLine className="h-4 w-4" />
          </Button>
        </TooltipCustom>
      </CardHeader>
      <CardContent className="px-6 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome"
                      {...field}
                      disabled={editProfile}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="exemplo@exemplo.com"
                      {...field}
                      disabled={editProfile}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!editPassword && (
              <>
                <Separator className="my-4" />

                <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Senha antiga</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          {...field}
                          type="password"
                          disabled={editPassword}
                        />
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
                      <FormLabel>Senha nova</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          {...field}
                          type="password"
                          disabled={editPassword}
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
                          {...field}
                          type="password"
                          disabled={editPassword}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {(!editProfile || !editPassword) && (
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading} variant="default">
                  {isLoading && <Spiner />}
                  Salvar
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
