import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { removeMany } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { QUESTIONS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { QUESTION_LIST_QUERY } from '../constants/queryKeys'
import { IQuestion, IQuestionInfo } from '../types/question'

const deleteQuestions = async (questionIds: string[]): Promise<string[]> => {
  const { data } = await ApiService.delete<AxiosResponse>(
    QUESTIONS_CRUD_ENDPOINT,
    {
      data: questionIds,
    },
  )
  return data as unknown as string[]
}

export function useDeleteQuestions(): IQuestionInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteQuestions, {
    onSuccess: (questionIds: string[]) => {
      queryClient.setQueryData<IQuestion[]>(
        [QUESTION_LIST_QUERY],
        (oldQuestions) => removeMany(oldQuestions, questionIds),
      )
    },
  })

  return { isDeleting: isLoading, deleteQuestions: mutateAsync }
}
