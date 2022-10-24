import axios, { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

import { API_ROUTE } from '../base/constants/routes'
import { useSnackbar } from '../core/contexts/SnackbarProvider'
import { useAuth } from '../modules/auth/contexts/AuthProvider'

export const API_BASE_URL = `/${API_ROUTE}`

export class HttpError extends Error {
  code: number
  constructor(message: string, code: number) {
    super(message)
    this.code = code
  }
}
export type ApiError = HttpError | Error

/**
 * Converts possible AxiosError objects to normal Error objects
 *
 * @returns HttpError if AxiosError, else original error
 */
export const transformAxiosError = (e: Error): ApiError => {
  if (axios.isAxiosError(e) && e.response) {
    const statusCode = e.response.status
    if (statusCode === 429) {
      return new HttpError('Please try again later.', statusCode)
    }
    if (typeof e.response.data === 'string') {
      return new HttpError(e.response.data, statusCode)
    }
    if (e.response.data?.message) {
      return new HttpError(e.response.data.message, statusCode)
    }
    if (e.response.statusText) {
      return new HttpError(e.response.statusText, statusCode)
    }

    return new HttpError(`Http ${statusCode} error`, statusCode)
  }
  return e
}

// Create own axios instance with defaults.
export const ApiService = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
})

ApiService.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Remove logged in state from localStorage
      const { logout } = useAuth()
      const { t } = useTranslation()
      const snackbar = useSnackbar()
      logout().catch(() =>
        snackbar.error(t('common.errors.unexpected.subTitle')),
      )
    }

    const transformedError = transformAxiosError(error)
    throw transformedError
  },
)
