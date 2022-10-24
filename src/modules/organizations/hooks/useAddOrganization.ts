import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { addOne } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { ORGANIZATIONS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { ORGANIZATION_LIST_QUERY } from '../constants/queryKeys'
import { IOrganization, IOrganizationInfo } from '../types/organization'

const addOrganization = async (
  organization: IOrganization,
): Promise<IOrganization> => {
  const { data } = await ApiService.post<AxiosResponse>(
    ORGANIZATIONS_CRUD_ENDPOINT,
    organization,
  )
  return data as unknown as IOrganization
}

export function useAddOrganization(): IOrganizationInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addOrganization, {
    onSuccess: (organization: IOrganization) => {
      queryClient.setQueryData<IOrganization[]>(
        [ORGANIZATION_LIST_QUERY],
        (oldOrganizations) => addOne(oldOrganizations, organization),
      )
    },
  })

  return { isAdding: isLoading, addOrganization: mutateAsync }
}
