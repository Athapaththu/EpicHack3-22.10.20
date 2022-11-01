import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import BaseAppBar from '../../../base/components/BaseAppBar'
import BaseToolbar from '../../../base/components/BaseToolbar'
import ConfirmDialog from '../../../core/components/ConfirmDialog'
import SelectToolbar from '../../../core/components/SelectToolbar'
import { useSnackbar } from '../../../core/contexts/SnackbarProvider'
import { IAddress } from '../../../shared/types/address'
import OrganizationAddress from '../components/OrganizationAddress'
import OrganizationDialog from '../components/OrganizationDialog'
import OrganizationTable from '../components/OrganizationTable'
import { useAddOrganization } from '../hooks/useAddOrganization'
import { useDeleteOrganizations } from '../hooks/useDeleteOrganizations'
import { useOrganizations } from '../hooks/useOrganizations'
import { useUpdateOrganization } from '../hooks/useUpdateOrganization'
import { IOrganization } from '../types/organization'

const OrganizationOrganization = (): JSX.Element => {
  const snackbar = useSnackbar()
  const { t } = useTranslation()

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
  const [openOrganizationDialog, setOpenOrganizationDialog] =
    useState<boolean>(false)
  const [openOrganizationAddress, setOpenOrganizationAddress] =
    useState<boolean>(false)
  const [selected, setSelected] = useState<string[]>([])
  const [organizationDeleted, setOrganizationDeleted] = useState<string[]>([])
  // eslint-disable-next-line prettier/prettier
  const [organizationUpdated, setOrganizationUpdated] = useState<IOrganization | undefined>(undefined)
  const { addOrganization, isAdding } = useAddOrganization()
  const { deleteOrganizations, isDeleting } = useDeleteOrganizations()
  const { isUpdating, updateOrganization } = useUpdateOrganization()
  const { data } = useOrganizations()

  const processing = isAdding || isDeleting || isUpdating

  const handleAddOrganization = async (
    organization: Partial<IOrganization>,
  ) => {
    addOrganization(organization as IOrganization)
      .then(() => {
        snackbar.success(
          t('organizationManagement.notifications.addSuccess', {
            organization: `${organization.firstName} ${organization.lastName}`,
          }),
        )
        setOpenOrganizationDialog(false)
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  const handleDeleteOrganizations = async () => {
    deleteOrganizations(organizationDeleted)
      .then(() => {
        snackbar.success(
          t('organizationManagement.notifications.deleteSuccess'),
        )
        setSelected([])
        setOrganizationDeleted([])
        setOpenConfirmDeleteDialog(false)
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  const handleUpdateOrganization = async (organization: IOrganization) => {
    updateOrganization(organization)
      .then(() => {
        snackbar.success(
          t('organizationManagement.notifications.updateSuccess', {
            organization: `${organization.firstName} ${organization.lastName}`,
          }),
        )
        setOpenOrganizationDialog(false)
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

  const handleCloseOrganizationDialog = () => {
    setOrganizationUpdated(undefined)
    setOpenOrganizationDialog(false)
  }

  const handleOpenConfirmDeleteDialog = (organizationIds: string[]) => {
    setOrganizationDeleted(organizationIds)
    setOpenConfirmDeleteDialog(true)
  }
  const handleOpenAddBranchDialog = (organizationId: string) => {
    setOpenOrganizationAddress(true)
  }

  const handleOpenOrganizationDialog = (organization?: IOrganization) => {
    setOrganizationUpdated(organization)
    setOpenOrganizationDialog(true)
  }

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected)
  }

  function handleAddAddress(organization: Partial<IAddress>): void {
    throw new Error('Function not implemented.')
  }

  return (
    <React.Fragment>
      <BaseAppBar>
        {!selected.length ? (
          <BaseToolbar title={t('organizationManagement.toolbar.title')}>
            <Fab
              aria-label="logout"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenOrganizationDialog()}
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
      <OrganizationTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenOrganizationDialog}
        onAddBranch={handleOpenAddBranchDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        organizations={data}
      />
      <ConfirmDialog
        description={t('organizationManagement.confirmations.delete')}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteOrganizations}
        open={openConfirmDeleteDialog}
        title={t('common.confirmation')}
      />
      {openOrganizationDialog && (
        <OrganizationDialog
          onAdd={handleAddOrganization}
          onClose={handleCloseOrganizationDialog}
          onUpdate={handleUpdateOrganization}
          open={openOrganizationDialog}
          processing={processing}
          organization={organizationUpdated}
        />
      )}

      {openOrganizationAddress && (
        <OrganizationAddress
          onAdd={handleAddAddress}
          onUpdate={() => {
            console.log('onUpdate')
          }}
          onClose={handleCloseOrganizationDialog}
          open={openOrganizationAddress}
          processing={processing}
          selected={true}
        />
      )}
    </React.Fragment>
  )
}

export default OrganizationOrganization
