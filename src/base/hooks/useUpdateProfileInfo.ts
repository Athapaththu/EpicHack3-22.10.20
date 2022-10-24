import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { ApiService } from '../../services/ApiService'
import { USERS_PROFILE_CURD_ENDPOINT } from '../constants/apiEndpoints'
import { USER_PROFILE_INFO_QUERY } from '../constants/queryKeys'
import { IisUpdateUserInfo, IProfile } from '../types/profileInfo'

const updateProfileInfo = async (profileInfo: IProfile): Promise<IProfile> => {
  const { data } = await ApiService.put<AxiosResponse>(
    USERS_PROFILE_CURD_ENDPOINT,
    profileInfo,
  )
  return data as unknown as IProfile
}

export function useUpdateProfileInfo(): IisUpdateUserInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateProfileInfo, {
    onSuccess: (profileInfo: IProfile) => {
      queryClient.setQueryData([USER_PROFILE_INFO_QUERY], profileInfo)
    },
  })

  return { isUpdating: isLoading, updateProfileInfo: mutateAsync }
}
