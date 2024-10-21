import { ButtonHTMLAttributes } from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'error' | 'success'
  isLoading?: boolean
  widthFull?: boolean
  title: string
}

export function Button({
  variant = 'secondary',
  isLoading = false,
  title,
  widthFull,
  ...props
}: IButtonProps) {
  const classBase = 'px-4 py-2 rounded-md font-bold duration-100'
  const classPrimary = 'bg-secondary text-white hover:bg-green-500'
  const classSuccess = 'bg-green-500 text-white hover:bg-green-700'
  const classError = 'bg-red-500 text-white hover:bg-red-700'
  const classSecondary =
    'border bg-transparent hover:bg-red-500 hover:text-white'

  return (
    <button
      className={`${classBase} ${
        variant === 'primary'
          ? classPrimary
          : variant === 'error'
            ? classError
            : variant === 'success'
              ? classSuccess
              : classSecondary && classSecondary
      } ${
        isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${props.className}
      ${widthFull && 'w-full'}`}
      {...props}
    >
      {isLoading ? (
        <BiLoaderAlt
          className="animate-spin duration-500 text-white mx-8"
          size={25}
        />
      ) : (
        title
      )}
    </button>
  )
}
