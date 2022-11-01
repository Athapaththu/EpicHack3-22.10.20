/* eslint-disable prettier/prettier */
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Tab,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { IAddress } from '../../../shared/types/address'

const ListOfBranches = [
  'Dependent Branches',
  'Independent Branch',
  'Home Branch',
  'Foreign Branch',
]

type OrganizationAddressProps = {
  // eslint-disable-next-line no-unused-vars
  onAdd: (organization: Partial<IAddress>) => void
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onUpdate: (organization: IAddress) => void
  open: boolean
  processing: boolean
  selected: boolean
  address?: IAddress
}

const OrganizationAddress = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  address,
}: OrganizationAddressProps): JSX.Element => {
  const { t } = useTranslation()

  const editMode = Boolean(address && address.id)

  const handleSubmit = (values: Partial<IAddress>) => {
    if (address && address.id) {
      onUpdate({ ...values, id: address.id } as IAddress)
    } else {
      onAdd(values)
    }
  }
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const formik = useFormik({
    initialValues: {
      disabled: address ? address.disabled : false,
      email: address ? address.email : '',
      website: address ? address.website : '',
      contactPerson: address ? address.contactPerson : '',
      addressLine: address ? address.addressLine : '',
      street: address ? address.street : '',
      countryName: address ? address.countryName : '',
      postalCode: address ? address.postalCode : '',
      city: address ? address.city : '',
      branchType: address ? address.branchType : '',
      contactNumber: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('common.validations.email'))
        .required(t('common.validations.required')),
      contactNumber: Yup.number()
        .integer()
        .max(12, t('common.validations.max', { size: 12 })),
      website: Yup.string().required(t('common.validations.required')),
      contactPerson: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      countryName: Yup.string()
        .max(30, t('common.validations.max', { size: 30 }))
        .required(t('common.validations.required')),
      addressLine: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      street: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      branchType: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      postalCode: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      city: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      departmentName: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
    }),
    onSubmit: handleSubmit,
  })
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="organization-dialog-title"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="organization-dialog-title">
          {editMode
            ? t('organizationManagement.branch.edit.title')
            : t('organizationManagement.branch.add.title')}
        </DialogTitle>
        <DialogContent>
          <Grid item xs={12} md={8} marginTop={3}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Add Branch " value="1" />
                      <Tab label="List of Branches" value="2" />
                    </TabList>
                  </Box>

                  {/* tab start */}
                  {/* tab 1 */}
                  <TabPanel value="1">
                    <form onSubmit={formik.handleSubmit} noValidate>
                      <DialogContent>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="branchType"
                          label={t(
                            'organizationManagement.branch.branchType.label',
                          )}
                          name="branchType"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.branchType}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.branchType &&
                            Boolean(formik.errors.branchType)
                          }
                          helperText={
                            formik.touched.branchType &&
                            formik.errors.branchType
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="contactPerson"
                          label={t(
                            'organizationManagement.branch.contactPerson.label',
                          )}
                          name="contactPerson"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.contactPerson}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.contactPerson &&
                            Boolean(formik.errors.contactPerson)
                          }
                          helperText={
                            formik.touched.contactPerson &&
                            formik.errors.contactPerson
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="countryName"
                          label={t(
                            'organizationManagement.branch.countryName.label',
                          )}
                          name="countryName"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.countryName}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.countryName &&
                            Boolean(formik.errors.countryName)
                          }
                          helperText={
                            formik.touched.countryName &&
                            formik.errors.countryName
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="addressLine"
                          label={t(
                            'organizationManagement.branch.addressLine.label',
                          )}
                          name="addressLine"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.addressLine}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.addressLine &&
                            Boolean(formik.errors.addressLine)
                          }
                          helperText={
                            formik.touched.addressLine &&
                            formik.errors.addressLine
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="street"
                          label={t(
                            'organizationManagement.branch.street.label',
                          )}
                          name="street"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.street}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.street &&
                            Boolean(formik.errors.street)
                          }
                          helperText={
                            formik.touched.street && formik.errors.street
                          }
                        />

                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="city"
                          label={t('organizationManagement.branch.city.label')}
                          name="city"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.city && Boolean(formik.errors.city)
                          }
                          helperText={formik.touched.city && formik.errors.city}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="postalCode"
                          label={t(
                            'organizationManagement.branch.postalCode.label',
                          )}
                          name="postalCode"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.postalCode}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.postalCode &&
                            Boolean(formik.errors.postalCode)
                          }
                          helperText={
                            formik.touched.postalCode &&
                            formik.errors.postalCode
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label={t('organizationManagement.branch.email.label')}
                          name="email"
                          autoComplete="email"
                          disabled={processing}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="website"
                          label={t(
                            'organizationManagement.branch.website.label',
                          )}
                          name="website"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.website}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.website &&
                            Boolean(formik.errors.website)
                          }
                          helperText={
                            formik.touched.website && formik.errors.website
                          }
                        />
                      </DialogContent>
                    </form>
                  </TabPanel>
                  {/* tab 2 */}
                  <TabPanel value="2">
                    <form onSubmit={formik.handleSubmit} noValidate>
                      <DialogContent>
                        <Grid item xs={12} md={8} marginTop={3}>
                          <Box>
                            <Box sx={{ width: '300px', typography: 'body1' }}>
                              <DialogContent>
                                <TextField
                                  margin="normal"
                                  required
                                  id="ListOfBranch"
                                  disabled={processing}
                                  fullWidth
                                  select
                                  label={t(
                                    'organizationManagement.form.ListOfBranch.label',
                                  )}
                                  name="ListOfBranch"
                                  value={formik.values.ListOfBranch}
                                  onChange={formik.handleChange}
                                  error={
                                    formik.touched.ListOfBranch &&
                                    Boolean(formik.errors.ListOfBranch)
                                  }
                                  helperText={
                                    formik.touched.ListOfBranch &&
                                    formik.errors.ListOfBranch
                                  }
                                >
                                  {ListOfBranches.map((ListOfBranch) => (
                                    <MenuItem
                                      key={ListOfBranch}
                                      value={ListOfBranch}
                                    >
                                      {ListOfBranch}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </DialogContent>
                            </Box>
                          </Box>
                        </Grid>
                      </DialogContent>
                    </form>
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode
              ? t('organizationManagement.modal.edit.action')
              : t('organizationManagement.modal.add.action')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default OrganizationAddress
