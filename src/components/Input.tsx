import cn from 'classnames'
import { forwardRef, InputHTMLAttributes, Ref } from 'react'

type InputProps = {
  label: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

function InputBase(
  { label, error, id, className, disabled, ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div className="flex flex-col">
      <label className="text-neutral-600 mb-0.5" htmlFor={id}>
        {label}
      </label>

      <input
        className={cn('border-2 p-2 border-[#1ca0b1]', className, {
          'border-red-300': error,
          'bg-neutral-100': disabled
        })}
        id={id}
        ref={ref}
        disabled={disabled}
        {...props}
      />
      <div className="text-xs text-red-500 h-5">{error}</div>
    </div>
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>(InputBase)
