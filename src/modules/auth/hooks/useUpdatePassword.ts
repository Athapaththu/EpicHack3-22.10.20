import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { AUTH_USER_UPDATE_PASSWORD_ENDPOINT } from '../constants/apiEndpoints'
import { IAuthInfo } from '../types/authInfo'

const updatePassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string
  newPassword: string
}) => {
  const { data } = await ApiService.put<AxiosResponse>(
    AUTH_USER_UPDATE_PASSWORD_ENDPOINT,
    {
      oldPassword,
      newPassword,
    },
  )
  return data
}

export function useUpdatePassword(): IAuthInfo {
  const { isLoading, mutateAsync } = useMutation(updatePassword)
  return { isUpdating: isLoading, updatePassword: mutateAsync }
}
