import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { AUTH_USER_LOGIN_ENDPOINT } from '../constants/apiEndpoints'

const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<any> => {
  const { data } = await ApiService.post<AxiosResponse>(
    AUTH_USER_LOGIN_ENDPOINT,
    {
      email,
      password,
    },
  )
  return data
}

export function useLogin(): any {
  const { isLoading, mutateAsync } = useMutation(login)
  return { isLoggingIn: isLoading, login: mutateAsync }
}
