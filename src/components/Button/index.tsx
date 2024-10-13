import { ButtonHTMLAttributes, ReactNode } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'secondary',
  isLoading = false,
  children,
  ...props
}: IButtonProps) {
  const classBase = 'px-4 py-2 rounded-md font-bold duration-100'
  const classPrimary = 'bg-secondary text-white hover:bg-green-500'
  const classSecondary =
    'border bg-transparent hover:bg-red-500 hover:text-white'

  return (
    <button
      className={`${classBase} ${
        variant === 'primary' || isLoading ? classPrimary : classSecondary
      }`}
      {...props}
    >
      {isLoading ? (
        <BiLoaderAlt
          className="animate-spin duration-500 text-white mx-8"
          size={25}
        />
      ) : (
        children
      )}
    </button>
  )
}
