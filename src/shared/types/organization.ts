export interface IBaseOrganization {
  id: string
  avatar?: string
  email: string
  firstName: string
  job: string
  lastName: string
  progress: number
  organizationType: string
  countryName: string
  organizationName: string
  description: string
  registerNo: string
  vision: string
  geographicArea: string
  departmentName: string
  designation: string
  website: string
  contactNumber: string
}

export interface IOrganization extends IBaseOrganization {
  disabled: boolean
  gender?: 'F' | 'M' | 'NC'
}

export interface IAuthOrganization extends IBaseOrganization {
  job: string
  progress: number
}
