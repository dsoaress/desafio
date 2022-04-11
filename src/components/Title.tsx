import cn from 'classnames'
import { ReactNode } from 'react'

export const Title = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h2 className={cn('text-2xl text-neutral-600 font-bold mb-4', className)}>{children}</h2>
)
