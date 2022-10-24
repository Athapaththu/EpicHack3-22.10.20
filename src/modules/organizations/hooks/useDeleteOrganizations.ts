import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { removeMany } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { ORGANIZATIONS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { ORGANIZATION_LIST_QUERY } from '../constants/queryKeys'
import { IOrganization, IOrganizationInfo } from '../types/organization'

const deleteOrganizations = async (
  organizationIds: string[],
): Promise<string[]> => {
  const { data } = await ApiService.delete<AxiosResponse>(
    ORGANIZATIONS_CRUD_ENDPOINT,
    {
      data: organizationIds,
    },
  )
  return data as unknown as string[]
}

export function useDeleteOrganizations(): IOrganizationInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteOrganizations, {
    onSuccess: (organizationIds: string[]) => {
      queryClient.setQueryData<IOrganization[]>(
        [ORGANIZATION_LIST_QUERY],
        (oldOrganizations) => removeMany(oldOrganizations, organizationIds),
      )
    },
  })

  return { isDeleting: isLoading, deleteOrganizations: mutateAsync }
}
