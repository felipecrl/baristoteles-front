'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

import { createNewUser, updateUser } from '@/services/admin/users'
import { UsersProps } from '@/app/(logged)/admin/users/columns'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Spiner from '@/components/spiner'

interface FormEditCreateUserProps {
  token: string | undefined
  data?: UsersProps
}

const formSchema = z.object({
  name: z.string({
    required_error: 'Campo obrigatório'
  }),
  email: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .email({
      message: 'E-mail inválido'
    }),
  roles: z.string({
    required_error: 'Campo obrigatório'
  }),
  password: z.string({
    required_error: 'Campo obrigatório'
  })
})

const formSchemaPasswordOptional = z.object({
  name: z.string({
    required_error: 'Campo obrigatório'
  }),
  email: z
    .string({
      required_error: 'Campo obrigatório'
    })
    .email({
      message: 'E-mail inválido'
    }),
  roles: z.string({
    required_error: 'Campo obrigatório'
  }),
  password: z.string().optional()
})

export function FormEditCreateUser({ token, data }: FormEditCreateUserProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const schema = !data ? formSchema : formSchemaPasswordOptional

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      roles: data?.roles
    }
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true)

    if (data) {
      await updateUser(token, values, data.id)
    } else {
      await createNewUser(token, values)
    }

    setIsLoading(false)

    router.replace('/admin/users')
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Tipo de usuário</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Escolha um tipo de permissão" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {!data && (
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
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} variant="default">
            {isLoading && <Spiner />}
            {!data ? 'Adicionar usuário' : 'Salvar usuário'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
