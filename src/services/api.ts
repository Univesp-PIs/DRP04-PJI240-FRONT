import axios, { AxiosError } from 'axios'
import { destroyCookie, parseCookies } from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { AuthTokenError } from '../errors/AuthTokenError'

interface AxiosErrorResponse {
  error?: string
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
    baseURL: 'https://engsol-django-render.onrender.com',
    headers: {
      Authorization: `Bearer ${cookies['engsol.token']}`,
    },
  })

  // console.log('cookies antes', parseCookies())
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response?.status === 401) {
        if (error.response.data?.error === 'Token inválido') {
          const originalConfig = error.config

          // renovar token
          cookies = parseCookies()

          // console.log('cookies depois', cookies)

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
          // console.log('cai aqui')

          axios.defaults.headers.common.Authorization = false
          destroyCookie(null, 'engsol.data', {
            path: '/',
          })
          destroyCookie(null, 'engsol.token', {
            path: '/',
          })
          // deslogar o usuário
          if (process.browser) {
            destroyCookie(null, 'engsol.data', {
              path: '/',
            })
            destroyCookie(null, 'engsol.token', {
              path: '/',
            })
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
