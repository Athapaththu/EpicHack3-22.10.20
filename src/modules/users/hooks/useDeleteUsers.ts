import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { removeMany } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { USERS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { USER_LIST_QUERY } from '../constants/queryKeys'
import { IUser, IUserInfo } from '../types/user'

const deleteUsers = async (userIds: string[]): Promise<string[]> => {
  const { data } = await ApiService.delete<AxiosResponse>(USERS_CRUD_ENDPOINT, {
    data: userIds,
  })
  return data as unknown as string[]
}

export function useDeleteUsers(): IUserInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteUsers, {
    onSuccess: (userIds: string[]) => {
      queryClient.setQueryData<IUser[]>([USER_LIST_QUERY], (oldUsers) =>
        removeMany(oldUsers, userIds),
      )
    },
  })

  return { isDeleting: isLoading, deleteUsers: mutateAsync }
}
