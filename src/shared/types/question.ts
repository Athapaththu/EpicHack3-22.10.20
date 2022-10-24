export interface IBaseQuestion {
  id: string
  avatar?: string
  orderNo: string
  firstName: string
  newQuestion: string
  lastName: string
  progress: number
  questionCode: string
  questionPre: string
  questionName: string
  moduleNo: string
  registerNo: string
  vision: string
  geographicArea: string
  departmentName: string
  designation: string
  metaQuestion: string
  questionWeights: string
  questionNumber: string
  module: string
  description: string
  order: string
  questionDescription: string
}

export interface IQuestion extends IBaseQuestion {
  disabled: boolean
  gender?: 'F' | 'M' | 'NC'
}

export interface IAuthQuestion extends IBaseQuestion {
  job: string
  progress: number
}
