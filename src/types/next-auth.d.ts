import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session extends NextAuth {
    user: {
      id: string
      name: string
      email: string
      roles: string
      avatar_url: string
    }
  }
}
