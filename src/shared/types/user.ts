export interface IBaseUser {
  id: string
  avatar?: string
  email: string
  firstName: string
  job: string
  lastName: string
  progress: number
  role: string
}

export interface IUser extends IBaseUser {
  disabled: boolean
  gender?: 'F' | 'M' | 'NC'
}

export interface IAuthUser extends IBaseUser {
  job: string
  progress: number
}
