import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { AUTH_USER_LOGOUT_ENDPOINT } from '../constants/apiEndpoints'
import { IAuthInfo } from '../types/authInfo'

const logout = async (): Promise<any> => {
  const { data } = await ApiService.post<AxiosResponse>(
    AUTH_USER_LOGOUT_ENDPOINT,
  )
  return data
}

export function useLogout(): IAuthInfo {
  const { isLoading, mutateAsync } = useMutation(logout)
  return { isLoggingOut: isLoading, logout: mutateAsync }
}
