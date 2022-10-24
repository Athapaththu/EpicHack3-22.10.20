import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { IisUpdateUserInfo } from '../../../base/types/profileInfo'
import { updateOne } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { QUESTIONS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { QUESTION_LIST_QUERY } from '../constants/queryKeys'
import { IQuestion } from '../types/question'

const updateQuestion = async (question: IQuestion): Promise<IQuestion> => {
  const { data } = await ApiService.put<AxiosResponse>(
    QUESTIONS_CRUD_ENDPOINT,
    question,
  )
  return data as unknown as IQuestion
}

export function useUpdateQuestion(): IisUpdateUserInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateQuestion, {
    onSuccess: (question: IQuestion) => {
      queryClient.setQueryData<IQuestion[]>(
        [QUESTION_LIST_QUERY],
        (oldQuestions) => updateOne(oldQuestions, question),
      )
    },
  })

  return { isUpdating: isLoading, updateQuestion: mutateAsync }
}
