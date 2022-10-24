import { AxiosResponse } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { COUNTRIES_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { COUNTRY_LIST_QUERY } from '../constants/queryKeys'
import { ICountry } from '../types/country'

const fetchCountries = async (): Promise<ICountry[]> => {
  const { data } = await ApiService.get<AxiosResponse>(COUNTRIES_CRUD_ENDPOINT)
  return data as unknown as ICountry[]
}

export function useCountries(): UseQueryResult<ICountry[]> {
  return useQuery(COUNTRY_LIST_QUERY, () => fetchCountries())
}
