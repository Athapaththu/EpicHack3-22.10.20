import { AxiosResponse } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { USERS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { USER_LIST_QUERY } from '../constants/queryKeys'
import { IUser } from '../types/user'

const fetchUsers = async (): Promise<IUser[]> => {
  const { data } = await ApiService.get<AxiosResponse>(USERS_CRUD_ENDPOINT)
  return data as unknown as IUser[]
}

export function useUsers(): UseQueryResult<IUser[]> {
  return useQuery(USER_LIST_QUERY, () => fetchUsers())
}
