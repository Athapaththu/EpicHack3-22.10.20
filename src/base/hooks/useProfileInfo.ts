import { AxiosResponse } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

import { ApiService } from '../../services/ApiService'
import { USERS_PROFILE_CURD_ENDPOINT } from '../constants/apiEndpoints'
import { USER_PROFILE_INFO_QUERY } from '../constants/queryKeys'
import { IProfile } from '../types/profileInfo'

const fetchProfileInfo = async (): Promise<IProfile> => {
  const { data } = await ApiService.get<AxiosResponse>(
    USERS_PROFILE_CURD_ENDPOINT,
  )
  return data as unknown as IProfile
}

export function useProfileInfo(): UseQueryResult<IProfile> {
  return useQuery(USER_PROFILE_INFO_QUERY, () => fetchProfileInfo())
}
