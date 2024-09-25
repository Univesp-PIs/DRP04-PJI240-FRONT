'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
// import { ReactQueryDevtools } from 'react-query/types/devtools'

export const queryClient = new QueryClient()

export function ProviderQueryClient({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      {/* <ReactQueryDevtools /> */}
    </>
  )
}
