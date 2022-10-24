import { LoadingButton } from '@mui/lab'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { ICountry } from '../types/country'

const appCountry = [
  { label: 'countryManagement.form.appCountry.options.y', value: 'yes' },
  { label: 'countryManagement.form.appCountry.options.n', value: 'no' },
]

type CountryDialogProps = {
  onAdd: (country: Partial<ICountry>) => void
  onClose: () => void
  onUpdate: (country: ICountry) => void
  open: boolean
  processing: boolean
  country?: ICountry
}

const CountryDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  country,
}: CountryDialogProps): JSX.Element => {
  const { t } = useTranslation()

  const editMode = Boolean(country && country.id)

  const handleSubmit = (values: Partial<ICountry>) => {
    if (country && country.id) {
      onUpdate({ ...values, id: country.id } as ICountry)
    } else {
      onAdd(values)
    }
  }

  const formik = useFormik({
    initialValues: {
      disabled: country ? country.disabled : false,
      isoCode: country ? country.isoCode : '',
      appCountry: country ? country.appCountry : 'y',
      newCountry: country ? country.newCountry : '',
    },
    validationSchema: Yup.object({
      isoCode: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      newCountry: Yup.string()
        .max(30, t('common.validations.max', { size: 30 }))
        .required(t('common.validations.required')),
    }),
    onSubmit: handleSubmit,
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="country-dialog-title"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="country-dialog-title">
          {editMode
            ? t('countryManagement.modal.edit.title')
            : t('countryManagement.modal.add.title')}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newCountry"
            label={t('countryManagement.form.newCountry.label')}
            name="newCountry"
            autoComplete="family-name"
            autoFocus
            disabled={processing}
            value={formik.values.newCountry}
            onChange={formik.handleChange}
            error={
              formik.touched.newCountry && Boolean(formik.errors.newCountry)
            }
            helperText={formik.touched.newCountry && formik.errors.newCountry}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="isoCode"
            label={t('countryManagement.form.isoCode.label')}
            name="isoCode"
            autoComplete="given-name"
            disabled={processing}
            value={formik.values.isoCode}
            onChange={formik.handleChange}
            error={formik.touched.isoCode && Boolean(formik.errors.isoCode)}
            helperText={formik.touched.isoCode && formik.errors.isoCode}
          />

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              {t('countryManagement.form.appCountry.label')}
            </FormLabel>
            <RadioGroup
              row
              aria-label="appCountry"
              name="appCountry"
              value={formik.values.appCountry}
              onChange={formik.handleChange}
            >
              {appCountry.map((appCountry) => (
                <FormControlLabel
                  key={appCountry.value}
                  disabled={processing}
                  value={appCountry.value}
                  control={<Radio />}
                  label={t(appCountry.label)}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              name="disabled"
              disabled={processing}
              onChange={formik.handleChange}
              checked={formik.values.disabled}
              control={<Checkbox />}
              sx={{ m: 2 }}
              label={t('countryManagement.form.disabled.label')}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode
              ? t('countryManagement.modal.edit.action')
              : t('countryManagement.modal.add.action')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CountryDialog
