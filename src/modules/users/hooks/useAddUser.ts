import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { addOne } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { USERS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { USER_LIST_QUERY } from '../constants/queryKeys'
import { IUser, IUserInfo } from '../types/user'

const addUser = async (user: IUser): Promise<IUser> => {
  const { data } = await ApiService.post<AxiosResponse>(
    USERS_CRUD_ENDPOINT,
    user,
  )
  return data as unknown as IUser
}

export function useAddUser(): IUserInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addUser, {
    onSuccess: (user: IUser) => {
      queryClient.setQueryData<IUser[]>([USER_LIST_QUERY], (oldUsers) =>
        addOne(oldUsers, user),
      )
    },
  })

  return { isAdding: isLoading, addUser: mutateAsync }
}
