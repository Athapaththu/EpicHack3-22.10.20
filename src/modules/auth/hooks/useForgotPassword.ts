import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { AUTH_USER_FORGOT_PASSWORD_ENDPOINT } from '../constants/apiEndpoints'
import { IAuthInfo } from '../types/authInfo'

const forgotPassword = async ({ email }: { email: string }) => {
  const { data } = await ApiService.post<AxiosResponse>(
    AUTH_USER_FORGOT_PASSWORD_ENDPOINT,
    {
      email,
    },
  )
  return data
}

export function useForgotPassword(): IAuthInfo {
  const { isLoading, mutateAsync } = useMutation(forgotPassword)
  return { isLoading, forgotPassword: mutateAsync }
}
