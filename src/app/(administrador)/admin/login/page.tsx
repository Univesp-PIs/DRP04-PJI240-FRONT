'use client'

import { AdminContext } from '@/contexts/AdminContext'
import { AuthContext } from '@/contexts/AuthContex'
import { useRouter } from 'next/navigation'
import { FormEvent, useContext, useEffect, useState } from 'react'

export default function Login() {
  const { setTitleHeader } = useContext(AdminContext)
  const { signIn, isAuthenticated } = useContext(AuthContext)
  // const [isSubmitting, setIsSubmitting] = useState(false)

  console.log('isAuthenticated', isAuthenticated)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setTitleHeader('Painel do Administrador dos Pedidos')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    // setIsSubmitting(true)

    // if (recaptchaValue === null) {
    //   toast.error('Preencha o re-captcha.')
    //   setIsSubmitting(false)
    //   return
    // }

    const fnSignIn = await signIn({ email, password })

    console.log('fnSignIn', fnSignIn)
    return

    // Incrementa a chave do reCAPTCHA para recriá-lo
    // setRecaptchaKey(recaptchaKey + 1)

    // reset()

    setEmail('')
    setPassword('')

    // setIsSubmitting(false)

    if (fnSignIn) {
      router.push('/admin/dashboard')
    }
  }

  return (
    <section className="w-full flex justify-center items-center h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex justify-center">
        <h1 className="text-4xl font-bold">Login de admin</h1>
        <form>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black text-white"
          />
          <input
            value={password}
            className="bg-black text-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
        </form>
      </div>
    </section>
  )
}
