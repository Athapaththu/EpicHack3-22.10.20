export interface IAddress {
  id: string
  description: any
  website: any
  branchType: any
  contactPerson: any
  addressLine: any
  countryName: any
  ListOfBranch: any
  street: string | null
  // type: AddressTypeEnum+
  line1: string | null
  // street: string
  email: string
  city: string | null
  postalCode?: string
  contactNumber: string | null
  disabled: boolean
  country?: string
  location?: {
    lat: number
    lng: number
  }
}

// export enum AddressTypeEnum {
//   Resident,
//   Postal,
//   Office,
// }
