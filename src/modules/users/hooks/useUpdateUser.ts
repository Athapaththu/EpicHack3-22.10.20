import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { IisUpdateUserInfo } from '../../../base/types/profileInfo'
import { updateOne } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { USERS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { USER_LIST_QUERY } from '../constants/queryKeys'
import { IUser } from '../types/user'

const updateUser = async (user: IUser): Promise<IUser> => {
  const { data } = await ApiService.put<AxiosResponse>(
    USERS_CRUD_ENDPOINT,
    user,
  )
  return data as unknown as IUser
}

export function useUpdateUser(): IisUpdateUserInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateUser, {
    onSuccess: (user: IUser) => {
      queryClient.setQueryData<IUser[]>([USER_LIST_QUERY], (oldUsers) =>
        updateOne(oldUsers, user),
      )
    },
  })

  return { isUpdating: isLoading, updateUser: mutateAsync }
}
