/* eslint-disable prettier/prettier */
import { LoadingButton } from '@mui/lab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
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

import { IOrganization } from '../types/organization'

const countryNames = [
  'National',
  'Provincial',
  'District',
  'City/Municipality',
  'Village',
]
const organizationTypes = [
  'Government',
  'Semi-Government',
  'Non-Government',
  'Private',
  'Other',
]

const geographicAreas = [
  'National',
  'Provincial',
  'District',
  'City/Municipality',
  'Village',
]

type OrganizationDialogProps = {
  onAdd: (organization: Partial<IOrganization>) => void
  onClose: () => void
  onUpdate: (organization: IOrganization) => void
  open: boolean
  processing: boolean
  organization?: IOrganization
}

const OrganizationDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  organization,
}: OrganizationDialogProps): JSX.Element => {
  const { t } = useTranslation()

  const editMode = Boolean(organization && organization.id)

  const handleSubmit = (values: Partial<IOrganization>) => {
    if (organization && organization.id) {
      onUpdate({ ...values, id: organization.id } as IOrganization)
    } else {
      onAdd(values)
    }
  }

  const formik = useFormik({
    initialValues: {
      disabled: organization ? organization.disabled : false,
      email: organization ? organization.email : '',
      organizationName: organization ? organization.organizationName : '',
      description: organization ? organization.description : '',
      registerNo: organization ? organization.registerNo : '',
      countryName: organization ? organization.countryName : '',
      organizationType: organization ? organization.organizationType : '',
      vision: organization ? organization.vision : '',
      mission: organization ? organization.mission : '',
      category: organization ? organization.category : '',
      geographicArea: organization ? organization.geographicArea : '',
      departmentName: organization ? organization.departmentName : '',
      designation: organization ? organization.designation : '',
      website: organization ? organization.website : '',
      contactNumber: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('common.validations.email'))
        .required(t('common.validations.required')),
      organizationName: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      countryName: Yup.string()
        .max(30, t('common.validations.max', { size: 30 }))
        .required(t('common.validations.required')),
      description: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      registerNo: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      category: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      vision: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      mission: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      departmentName: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      designation: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      organizationType: Yup.string().required(t('common.validations.required')),
      geographicArea: Yup.string().required(t('common.validations.required')),
      contactNumber: Yup.number()
        .integer()
        .max(12, t('common.validations.max', { size: 12 })),
      website: Yup.string().required(t('common.validations.required')),
    }),
    onSubmit: handleSubmit,
  });

  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="organization-dialog-title"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="organization-dialog-title">
          {editMode
            ? t('organizationManagement.modal.edit.title')
            : t('organizationManagement.modal.add.title')}
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
                      <Tab label="Organizations" value="1" />
                      <Tab label="Departments" value="2" />
                      <Tab label="Designations" value="3" />
                      <Tab label="List Of Branches" value="4" />
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
                          id="countryName"
                          disabled={processing}
                          fullWidth
                          select
                          label={t(
                            'organizationManagement.form.countryName.label',
                          )}
                          name="countryName"
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
                        >
                          {countryNames.map((countryName) => (
                            <MenuItem key={countryName} value={countryName}>
                              {countryName}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="category"
                          label={t(
                            'organizationManagement.form.category.label',
                          )}
                          name="category"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.category}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.category &&
                            Boolean(formik.errors.category)
                          }
                          helperText={
                            formik.touched.category && formik.errors.category
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="organizationName"
                          label={t(
                            'organizationManagement.form.organizationName.label',
                          )}
                          name="organizationName"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.organizationName}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.organizationName &&
                            Boolean(formik.errors.organizationName)
                          }
                          helperText={
                            formik.touched.organizationName &&
                            formik.errors.organizationName
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="descriptionName"
                          label={t(
                            'organizationManagement.form.description.label',
                          )}
                          name="description"
                          autoComplete="given-name"
                          multiline
                          minRows={4}
                          disabled={processing}
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                          }
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="registerNo"
                          label={t(
                            'organizationManagement.form.registerNo.label',
                          )}
                          name="registerNo"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.registerNo}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.registerNo &&
                            Boolean(formik.errors.registerNo)
                          }
                          helperText={
                            formik.touched.registerNo &&
                            formik.errors.registerNo
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="vision"
                          label={t('organizationManagement.form.vision.label')}
                          name="vision"
                          autoComplete="given-name"
                          multiline
                          minRows={4}
                          disabled={processing}
                          value={formik.values.vision}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.vision &&
                            Boolean(formik.errors.vision)
                          }
                          helperText={
                            formik.touched.vision && formik.errors.vision
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="mission"
                          label={t('organizationManagement.form.mission.label')}
                          name="mission"
                          autoComplete="given-name"
                          multiline
                          minRows={4}
                          disabled={processing}
                          value={formik.values.mission}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.mission &&
                            Boolean(formik.errors.mission)
                          }
                          helperText={
                            formik.touched.mission && formik.errors.mission
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          id="organizationType"
                          disabled={processing}
                          fullWidth
                          select
                          label={t(
                            'organizationManagement.form.organizationType.label',
                          )}
                          name="organizationType"
                          value={formik.values.organizationType}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.organizationType &&
                            Boolean(formik.errors.organizationType)
                          }
                          helperText={
                            formik.touched.organizationType &&
                            formik.errors.organizationType
                          }
                        >
                          {organizationTypes.map((organizationType) => (
                            <MenuItem
                              key={organizationType}
                              value={organizationType}
                            >
                              {organizationType}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          margin="normal"
                          required
                          id="geographicArea"
                          disabled={processing}
                          fullWidth
                          select
                          label={t(
                            'organizationManagement.form.geographicArea.label',
                          )}
                          name="geographicArea"
                          value={formik.values.geographicArea}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.geographicArea &&
                            Boolean(formik.errors.geographicArea)
                          }
                          helperText={
                            formik.touched.geographicArea &&
                            formik.errors.geographicArea
                          }
                        >
                          {geographicAreas.map((geographicArea) => (
                            <MenuItem
                              key={geographicArea}
                              value={geographicArea}
                            >
                              {geographicArea}
                            </MenuItem>
                          ))}
                        </TextField>
                        <DialogTitle  sx={{ m: 1 }}>
                          {editMode
                            ? t('organizationManagement.topic.headOffice.label')
                            : t('organizationManagement.topic.headOffice.label')}
                        </DialogTitle>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label={t('organizationManagement.form.email.label')}
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
                          type="number"
                          fullWidth
                          id="contactNumber"
                          label={t(
                            'organizationManagement.form.contactNumber.label',
                          )}
                          name="contactNumber"
                          autoComplete="given-contactNumber"
                          disabled={processing}
                          value={formik.values.contactNumber}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.contactNumber &&
                            Boolean(formik.errors.contactNumber)
                          }
                          helperText={
                            formik.touched.contactNumber &&
                            formik.errors.contactNumber
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="website"
                          label={t('organizationManagement.form.website.label')}
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
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="departmentName"
                          label={t(
                            'organizationManagement.form.departmentName.label',
                          )}
                          name="departmentName"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.departmentName}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.departmentName &&
                            Boolean(formik.errors.departmentName)
                          }
                          helperText={
                            formik.touched.departmentName &&
                            formik.errors.departmentName
                          }
                        />
                      </DialogContent>
                    </form>
                  </TabPanel>
                  {/* tab 3 */}
                  <TabPanel value="3">
                    <form onSubmit={formik.handleSubmit} noValidate>
                      <DialogContent>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="designation"
                          label={t(
                            'organizationManagement.form.designation.label',
                          )}
                          name="designation"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.designation}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.designation &&
                            Boolean(formik.errors.designation)
                          }
                          helperText={
                            formik.touched.designation &&
                            formik.errors.designation
                          }
                        />
                      </DialogContent>
                    </form>
                  </TabPanel>
                  {/* tab 4 */}
                  <TabPanel value="4">
                    <form onSubmit={formik.handleSubmit} noValidate>
                      <DialogTitle>
                        {editMode
                          ? t('organizationManagement.topic.branch.label')
                          : t('organizationManagement.topic.branch.label')}
                      </DialogTitle>
                      <DialogContent>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label={t('organizationManagement.form.email.label')}
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
                          type="number"
                          fullWidth
                          id="contactNumber"
                          label={t(
                            'organizationManagement.form.contactNumber.label',
                          )}
                          name="contactNumber"
                          autoComplete="given-contactNumber"
                          disabled={processing}
                          value={formik.values.contactNumber}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.contactNumber &&
                            Boolean(formik.errors.contactNumber)
                          }
                          helperText={
                            formik.touched.contactNumber &&
                            formik.errors.contactNumber
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="website"
                          label={t('organizationManagement.form.website.label')}
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

export default OrganizationDialog
