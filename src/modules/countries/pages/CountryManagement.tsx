import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import BaseAppBar from '../../../base/components/BaseAppBar'
import BaseToolbar from '../../../base/components/BaseToolbar'
import ConfirmDialog from '../../../core/components/ConfirmDialog'
import SelectToolbar from '../../../core/components/SelectToolbar'
import { useSnackbar } from '../../../core/contexts/SnackbarProvider'
import CountryDialog from '../components/CountryDialog'
import CountryTable from '../components/CountryTable'
import { useAddCountry } from '../hooks/useAddCountry'
import { useCountries } from '../hooks/useCountries'
import { useDeleteCountries } from '../hooks/useDeleteCountries'
import { useUpdateCountry } from '../hooks/useUpdateCountry'
import { ICountry } from '../types/country'

const CountryManagement = (): JSX.Element => {
  const snackbar = useSnackbar()
  const { t } = useTranslation()

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
  const [openCountryDialog, setOpenCountryDialog] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [countryDeleted, setCountryDeleted] = useState<string[]>([])
  const [countryUpdated, setCountryUpdated] = useState<ICountry | undefined>(
    undefined,
  )

  const { addCountry, isAdding } = useAddCountry()
  const { deleteCountries, isDeleting } = useDeleteCountries()
  const { isUpdating, updateCountry } = useUpdateCountry()
  const { data } = useCountries()

  const processing = isAdding || isDeleting || isUpdating

  const handleAddCountry = async (country: Partial<ICountry>) => {
    addCountry(country as ICountry)
      .then(() => {
        snackbar.success(
          t('countryManagement.notifications.addSuccess', {
            country: `${country.firstName} ${country.lastName}`,
          }),
        )
        setOpenCountryDialog(false)
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  const handleDeleteCountries = async () => {
    deleteCountries(countryDeleted)
      .then(() => {
        snackbar.success(t('countryManagement.notifications.deleteSuccess'))
        setSelected([])
        setCountryDeleted([])
        setOpenConfirmDeleteDialog(false)
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  const handleUpdateCountry = async (country: ICountry) => {
    updateCountry(country)
      .then(() => {
        snackbar.success(
          t('countryManagement.notifications.updateSuccess', {
            country: `${country.firstName} ${country.lastName}`,
          }),
        )
        setOpenCountryDialog(false)
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  const handleCancelSelected = () => {
    setSelected([])
  }

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false)
  }

  const handleCloseCountryDialog = () => {
    setCountryUpdated(undefined)
    setOpenCountryDialog(false)
  }

  const handleOpenConfirmDeleteDialog = (countryIds: string[]) => {
    setCountryDeleted(countryIds)
    setOpenConfirmDeleteDialog(true)
  }

  const handleOpenCountryDialog = (country?: ICountry) => {
    setCountryUpdated(country)
    setOpenCountryDialog(true)
  }

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected)
  }

  return (
    <React.Fragment>
      <BaseAppBar>
        {!selected.length ? (
          <BaseToolbar title={t('countryManagement.toolbar.title')}>
            <Fab
              aria-label="logout"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenCountryDialog()}
              size="small"
            >
              <AddIcon />
            </Fab>
          </BaseToolbar>
        ) : (
          <SelectToolbar
            processing={processing}
            onCancel={handleCancelSelected}
            onDelete={handleOpenConfirmDeleteDialog}
            selected={selected}
          />
        )}
      </BaseAppBar>
      <CountryTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenCountryDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        countries={data}
      />
      <ConfirmDialog
        description={t('countryManagement.confirmations.delete')}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteCountries}
        open={openConfirmDeleteDialog}
        title={t('common.confirmation')}
      />
      {openCountryDialog && (
        <CountryDialog
          onAdd={handleAddCountry}
          onClose={handleCloseCountryDialog}
          onUpdate={handleUpdateCountry}
          open={openCountryDialog}
          processing={processing}
          country={countryUpdated}
        />
      )}
    </React.Fragment>
  )
}

export default CountryManagement
