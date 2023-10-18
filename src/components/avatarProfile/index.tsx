'use client'

import { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiOutlineCamera } from 'react-icons/ai'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface AvatarProfileProps {
  data: {
    id: string
    name: string
    email: string
    avatar_url: string
  }
}

export function AvatarProfile({ data }: AvatarProfileProps) {
  const [preview, setPreview] = useState('')
  const [updateAvatar, setUpdateAvatar] = useState<boolean>(false)

  const MAX_IMAGE_SIZE = 5242880 // 5 MB
  const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg'
  ]

  const formSchema = z.object({
    avatar: z
      .custom<FileList>((val) => val instanceof FileList, 'Required')
      .refine((files) => files.length > 0, `Required`)
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
        `Arquivo deve ter até 5 MB.`
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ALLOWED_IMAGE_TYPES.includes(file.type)
          ),
        'Extensões permitidas: .jpg, .jpeg, .png and .webp'
      )
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <>
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute bottom-0 right-0 z-10 rounded-full"
            onClick={() => setUpdateAvatar((prevCheck) => !prevCheck)}
          >
            <AiOutlineCamera className="h-4 w-4" />
          </Button>
          <Avatar className="m-auto h-28 w-28">
            <AvatarImage src={preview || data.avatar_url} />
            <AvatarFallback>
              {data?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      {updateAvatar && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-x-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { onChange }, ...field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple={false}
                        {...field}
                        onChange={(event) => {
                          const dataTransfer = new DataTransfer()
                          Array.from(event.target.files!).forEach((image) =>
                            dataTransfer.items.add(image)
                          )
                          const newFiles = dataTransfer.files
                          const displayUrl = URL.createObjectURL(
                            event.target.files![0]
                          )
                          setPreview(displayUrl)
                          onChange(newFiles)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button variant="default" type="submit">
              Enviar
            </Button>
          </form>
        </Form>
      )}
    </>
  )
}
