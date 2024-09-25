import axios, { AxiosError } from 'axios'
import { destroyCookie, parseCookies } from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { AuthTokenError } from '../errors/AuthTokenError'

interface AxiosErrorResponse {
  message?: string
}

type Context = undefined | GetServerSidePropsContext

type FailedRequestQueue = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

const failedRequestsQueue = Array<FailedRequestQueue>()

export function setupAPIClient(ctx: Context = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'https://curriculum42-django-render.onrender.com',
    headers: {
      Authorization: `Bearer ${cookies['curriculum42.token']}`,
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response?.status === 401) {
        if (error.response.data?.message === 'Token inválido') {
          const originalConfig = error.config

          // renovar token
          cookies = parseCookies()

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                if (!originalConfig?.headers) {
                  return // Eu coloquei um return mas pode colocar algum erro ou um reject
                }

                originalConfig.headers.Authorization = `Bearer ${token}`
                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          axios.defaults.headers.common.Authorization = false
          destroyCookie(undefined, 'curriculum42.token')
          // deslogar o usuário
          if (process.browser) {
            destroyCookie(undefined, 'curriculum42.token')
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    },
  )

  return api
}
