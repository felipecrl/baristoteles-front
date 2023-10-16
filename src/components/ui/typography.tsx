import * as React from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps {
  className?: string
  props?: React.HTMLProps<HTMLHeadingElement>
  children: React.ReactNode
}

const H1 = ({ className, props, children }: HeadingProps) => (
  <h1
    className={cn(
      'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      className
    )}
    {...props}
  >
    {children}
  </h1>
)

const H2 = ({ className, props, children }: HeadingProps) => (
  <h2
    className={cn(
      'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      className
    )}
    {...props}
  >
    {children}
  </h2>
)

const H3 = ({ className, props, children }: HeadingProps) => (
  <h3
    className={cn(
      'scroll-m-20 text-2xl font-semibold tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </h3>
)

const H4 = ({ className, props, children }: HeadingProps) => (
  <h4
    className={cn(
      'scroll-m-20 text-xl font-semibold tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </h4>
)

const Paragraph = ({ className, props, children }: HeadingProps) => (
  <p className={cn('leading-7', className)} {...props}>
    {children}
  </p>
)

export { H1, H2, H3, H4, Paragraph }
