import { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { addOne } from '../../../core/utils/crudUtils'
import { ApiService } from '../../../services/ApiService'
import { QUESTIONS_CRUD_ENDPOINT } from '../constants/apiEndpoints'
import { QUESTION_LIST_QUERY } from '../constants/queryKeys'
import { IQuestion, IQuestionInfo } from '../types/question'

const addQuestion = async (question: IQuestion): Promise<IQuestion> => {
  const { data } = await ApiService.post<AxiosResponse>(
    QUESTIONS_CRUD_ENDPOINT,
    question,
  )
  return data as unknown as IQuestion
}

export function useAddQuestion(): IQuestionInfo {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addQuestion, {
    onSuccess: (question: IQuestion) => {
      queryClient.setQueryData<IQuestion[]>(
        [QUESTION_LIST_QUERY],
        (oldQuestions) => addOne(oldQuestions, question),
      )
    },
  })

  return { isAdding: isLoading, addQuestion: mutateAsync }
}
