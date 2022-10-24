import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { IisUpdateUserInfo } from '../../../base/types/profileInfo'
import { updateOne } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { COUNTRIES_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { COUNTRY_LIST_QUERY } from '../constants/queryKeys'
import { ICountry } from '../types/country'

const updateCountry = async (country: ICountry): Promise<ICountry> => {
  const { data } = await ApiService.put<AxiosResponse>(
    COUNTRIES_CRUD_ENDPOINT,
    country,
  )
  return data as unknown as ICountry
}

export function useUpdateCountry(): IisUpdateUserInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateCountry, {
    onSuccess: (country: ICountry) => {
      queryClient.setQueryData<ICountry[]>(
        [COUNTRY_LIST_QUERY],
        (oldCountries) => updateOne(oldCountries, country),
      )
    },
  })

  return { isUpdating: isLoading, updateCountry: mutateAsync }
}
