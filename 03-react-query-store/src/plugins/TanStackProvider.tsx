import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

interface Props {
  children: React.ReactNode
}

export const TanStackProvider: React.FC<Props> = ({children}) => {
  return (
    <QueryClientProvider client={ queryClient }>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
