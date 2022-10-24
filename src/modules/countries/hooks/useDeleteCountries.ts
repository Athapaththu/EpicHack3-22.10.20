import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { removeMany } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { COUNTRIES_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { COUNTRY_LIST_QUERY } from '../constants/queryKeys'
import { ICountry, ICountryInfo } from '../types/country'

const deleteCountries = async (countryIds: string[]): Promise<string[]> => {
  const { data } = await ApiService.delete<AxiosResponse>(
    COUNTRIES_CRUD_ENDPOINT,
    {
      data: countryIds,
    },
  )
  return data as unknown as string[]
}

export function useDeleteCountries(): ICountryInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteCountries, {
    onSuccess: (countryIds: string[]) => {
      queryClient.setQueryData<ICountry[]>(
        [COUNTRY_LIST_QUERY],
        (oldCountries) => removeMany(oldCountries, countryIds),
      )
    },
  })

  return { isDeleting: isLoading, deleteCountries: mutateAsync }
}
