import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { AUTH_USER_REGISTER_ENDPOINT } from '../constants/apiEndpoints'
import { IAuthUser } from '../types/userInfo'

const register = async (userInfo: IAuthUser): Promise<IAuthUser> => {
  const { data } = await ApiService.post<AxiosResponse>(
    AUTH_USER_REGISTER_ENDPOINT,
    {
      userInfo,
    },
  )
  return data as unknown as IAuthUser
}

export function useRegister(): any {
  const { isLoading, mutateAsync } = useMutation(register)
  return { isRegistering: isLoading, register: mutateAsync }
}
