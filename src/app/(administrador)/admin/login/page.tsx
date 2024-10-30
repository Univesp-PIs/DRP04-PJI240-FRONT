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
    <section className="w-full flex justify-center items-center h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex justify-center">
        <div className="w-full max-w-md bg-ED7812 p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-white text-center">
            Painel do Administrador
          </h1>
        </div>
        <div className="w-full max-w-md mt-6 p-8 bg-white shadow-md rounded-lg">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-ED7812 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
