import { LoadingButton } from '@mui/lab'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { useSnackbar } from '../../core/contexts/SnackbarProvider'
import { useProfileInfo } from '../hooks/useProfileInfo'
import { useUpdateProfileInfo } from '../hooks/useUpdateProfileInfo'
import { IProfile } from '../types/profileInfo'

const ProfileEmployment = (): JSX.Element => {
  const snackbar = useSnackbar()
  const { t } = useTranslation()
  const { data } = useProfileInfo()
  const { isUpdating, updateProfileInfo } = useUpdateProfileInfo()
  const addressList = [
    'Address line',
    'Street',
    'City',
    'Poster Code',
    'Country',
  ]

  const formik = useFormik({
    initialValues: {
      email: data ? data.email : '',
      OrganizationName: data ? data.organizationName : '',
      job: data ? data.job : '',
      address: data ? data.address : '',
      contactNumber: '',
      website: '',
      addressList: data ? data.addressList : '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('common.validations.email'))
        .required(t('common.validations.required')),
      OrganizationName: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      address: Yup.string()
        .max(30, t('common.validations.max', { size: 30 }))
        .required(t('common.validations.required')),
      contactNumber: Yup.number()
        .integer()
        .max(12, t('common.validations.max', { size: 12 })),
      website: Yup.string()
        .max(30, t('common.validations.max', { size: 30 }))
        .required(t('common.validations.required')),
      addressList: Yup.string()
        .max(30, t('common.validations.max', { size: 30 }))
        .required(t('common.validations.required')),
    }),
    onSubmit: (values) => handleSubmit(values),
  })

  const handleSubmit = async (values: Partial<IProfile>) => {
    updateProfileInfo({ ...values, id: data?.id } as IProfile)
      .then(() => {
        snackbar.success(t('profile.notifications.informationUpdated'))
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Card>
        <CardHeader title={t('profile.info.titleForEmployment')} />
        <CardContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="OrganizationName"
            label={t('profile.info.form.OrganizationName.label')}
            name="OrganizationName"
            autoComplete="given-name"
            disabled={isUpdating}
            value={formik.values.OrganizationName}
            onChange={formik.handleChange}
            error={
              formik.touched.OrganizationName &&
              Boolean(formik.errors.OrganizationName)
            }
            helperText={
              formik.touched.OrganizationName && formik.errors.OrganizationName
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label={t('profile.info.form.address.label')}
            name="address"
            autoComplete="family-name"
            autoFocus
            disabled={isUpdating}
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            margin="normal"
            required
            id="addressList"
            disabled={isUpdating}
            fullWidth
            select
            label={t('profile.info.form.addressList.label')}
            name="addressList"
            value={formik.values.addressList}
            onChange={formik.handleChange}
            error={
              formik.touched.addressList && Boolean(formik.errors.addressList)
            }
            helperText={formik.touched.addressList && formik.errors.addressList}
          >
            {addressList.map((addressList) => (
              <MenuItem key={addressList} value={addressList}>
                {addressList}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('profile.info.form.email.label')}
            name="email"
            autoComplete="email"
            disabled={isUpdating}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            type="number"
            fullWidth
            id="contactNumber"
            label={t('auth.register.form.contactNumber.label')}
            name="contactNumber"
            autoComplete="given-contactNumber"
            disabled={isUpdating}
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.contactNumber &&
              Boolean(formik.errors.contactNumber)
            }
            helperText={
              formik.touched.contactNumber && formik.errors.contactNumber
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="website"
            label={t('profile.info.form.website.label')}
            name="website"
            autoComplete="family-name"
            disabled={isUpdating}
            value={formik.values.website}
            onChange={formik.handleChange}
            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={formik.touched.website && formik.errors.website}
          />
        </CardContent>
        <CardActions>
          <Button onClick={() => formik.resetForm()}>
            {t('common.reset')}
          </Button>
          <LoadingButton loading={isUpdating} type="submit" variant="contained">
            {t('common.update')}
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  )
}

export default ProfileEmployment
