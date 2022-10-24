import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { IisUpdateUserInfo } from '../../../base/types/profileInfo'
import { updateOne } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { ORGANIZATIONS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { ORGANIZATION_LIST_QUERY } from '../constants/queryKeys'
import { IOrganization } from '../types/organization'

const updateOrganization = async (
  organization: IOrganization,
): Promise<IOrganization> => {
  const { data } = await ApiService.put<AxiosResponse>(
    ORGANIZATIONS_CRUD_ENDPOINT,
    organization,
  )
  return data as unknown as IOrganization
}

export function useUpdateOrganization(): IisUpdateUserInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateOrganization, {
    onSuccess: (organization: IOrganization) => {
      queryClient.setQueryData<IOrganization[]>(
        [ORGANIZATION_LIST_QUERY],
        (oldOrganizations) => updateOne(oldOrganizations, organization),
      )
    },
  })

  return { isUpdating: isLoading, updateOrganization: mutateAsync }
}
