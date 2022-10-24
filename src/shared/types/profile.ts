import { IBaseCountry } from './country'
import { IBaseOrganization } from './organization'
import { IBaseUser } from './user'

export interface IProfile extends Omit<IBaseUser, 'role'> {
  address: any
  addressList: any
  gender?: 'F' | 'M' | 'NC'
  job: string
}

export interface IProfile extends Omit<IBaseCountry, 'role'> {
  appCountry?: 'y' | 'n'
  job: string
}

export interface IProfile extends Omit<IBaseOrganization, 'role'> {
  gender?: 'F' | 'M' | 'NC'
  job: string
}
