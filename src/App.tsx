import * as Sentry from '@sentry/react'
import { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import AppRoutes from './AppRoutes'
import Loader from './core/components/Loader'
import QueryWrapper from './core/components/QueryWrapper'
import SettingsProvider from './core/contexts/SettingsProvider'
import SnackbarProvider from './core/contexts/SnackbarProvider'
import usePageTracking from './core/hooks/usePageTracking'
import AuthProvider from './modules/auth/contexts/AuthProvider'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
  })
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
})

function App(): JSX.Element {
  usePageTracking()

  return (
    <Suspense fallback={<Loader />}>
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <QueryWrapper>
              <SnackbarProvider>
                <AuthProvider>
                  <AppRoutes />
                </AuthProvider>
              </SnackbarProvider>
            </QueryWrapper>
          </SettingsProvider>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </Suspense>
  )
}

export default App
