import { IAuthUser } from './userInfo'

export interface IAuthInfo {
  logout?: any
  login?: any
  forgotPassword?: any
  forgotPasswordSubmit?: any
  updatePassword?: any
  register?: any
  isLoading?: boolean
  isLoggingIn?: boolean
  isLoggingOut?: boolean
  isRegistering?: boolean
  isUpdating?: boolean
}

export interface AuthContextInterface {
  // eslint-disable-next-line @typescript-eslint/ban-types
  hasRole: (roles?: string[]) => {}
  isLoggingIn: boolean
  isLoggingOut: boolean
  login: (email: string, password: string) => Promise<any>
  logout: () => Promise<any>
  userInfo?: IAuthUser
}
