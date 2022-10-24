import { AxiosResponse } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

import { ApiService } from '../../../services/ApiService'
import { QUESTIONS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { QUESTION_LIST_QUERY } from '../constants/queryKeys'
import { IQuestion } from '../types/question'

const fetchQuestions = async (): Promise<IQuestion[]> => {
  const { data } = await ApiService.get<AxiosResponse>(QUESTIONS_CRUD_ENDPOINT)
  return data as unknown as IQuestion[]
}

export function useQuestions(): UseQueryResult<IQuestion[]> {
  return useQuery(QUESTION_LIST_QUERY, () => fetchQuestions())
}
