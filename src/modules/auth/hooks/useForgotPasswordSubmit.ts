import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { AUTH_USER_FORGOT_PASSWORD_SUBMIT_ENDPOINT } from '../constants/apiEndpoints'
import { IAuthInfo } from '../types/authInfo'

const forgotPasswordSubmit = async ({
  code,
  newPassword,
}: {
  code: string
  newPassword: string
}): Promise<any> => {
  const { data } = await ApiService.post<AxiosResponse>(
    AUTH_USER_FORGOT_PASSWORD_SUBMIT_ENDPOINT,
    {
      code,
      newPassword,
    },
  )
  return data
}

export function useForgotPasswordSubmit(): IAuthInfo {
  const { isLoading, mutateAsync } = useMutation(forgotPasswordSubmit)
  return { isLoading, forgotPasswordSubmit: mutateAsync }
}
