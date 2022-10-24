import { AxiosResponse } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { ORGANIZATIONS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { ORGANIZATION_LIST_QUERY } from '../constants/queryKeys'
import { IOrganization } from '../types/organization'

const fetchOrganizations = async (): Promise<IOrganization[]> => {
  const { data } = await ApiService.get<AxiosResponse>(
    ORGANIZATIONS_CRUD_ENDPOINT,
  )
  return data as unknown as IOrganization[]
}

export function useOrganizations(): UseQueryResult<IOrganization[]> {
  return useQuery(ORGANIZATION_LIST_QUERY, () => fetchOrganizations())
}
