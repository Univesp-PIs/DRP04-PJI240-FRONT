/* eslint-disable prettier/prettier */
"use client";

import { AdminContext } from "@/contexts/AdminContext";
import { AuthContext } from "@/contexts/AuthContex";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";

export default function Login() {
  const { setTitleHeader } = useContext(AdminContext);
  const { signIn, isAuthenticated } = useContext(AuthContext);
  // const [isSubmitting, setIsSubmitting] = useState(false)

  console.log("isAuthenticated", isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTitleHeader("Painel do Administrador dos Pedidos");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    // setIsSubmitting(true)

    // if (recaptchaValue === null) {
    //   toast.error('Preencha o re-captcha.')
    //   setIsSubmitting(false)
    //   return
    // }

    const fnSignIn = await signIn({ email, password });

    console.log("fnSignIn", fnSignIn);
    return;

    // Incrementa a chave do reCAPTCHA para recriá-lo
    // setRecaptchaKey(recaptchaKey + 1)

    // reset()

    setEmail("")
    setPassword("")

    // setIsSubmitting(false)

    if (fnSignIn) {
      router.push("/admin/dashboard");
    }
  }

  return (
    <><header className="bg-[#ED7812] text-blue-950 text-center py-5">
      <h1>Painel do Administrador de Pedidos</h1>
    </header><div className="container mx-auto mt-8">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">

                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Login"/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">

                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="Senha"/>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div></>
  )
}
