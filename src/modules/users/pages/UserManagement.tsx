import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import BaseAppBar from '../../../base/components/BaseAppBar'
import BaseToolbar from '../../../base/components/BaseToolbar'
import ConfirmDialog from '../../../core/components/ConfirmDialog'
import SelectToolbar from '../../../core/components/SelectToolbar'
import { useSnackbar } from '../../../core/contexts/SnackbarProvider'
import UserDialog from '../components/UserDialog'
import UserTable from '../components/UserTable'
import { useAddUser } from '../hooks/useAddUser'
import { useDeleteUsers } from '../hooks/useDeleteUsers'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { useUsers } from '../hooks/useUsers'
import { IUser } from '../types/user'

const UserManagement = (): JSX.Element => {
  const snackbar = useSnackbar()
  const { t } = useTranslation()

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
  const [openUserDialog, setOpenUserDialog] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [userDeleted, setUserDeleted] = useState<string[]>([])
  const [userUpdated, setUserUpdated] = useState<IUser | undefined>(undefined)

  const { addUser, isAdding } = useAddUser()
  const { deleteUsers, isDeleting } = useDeleteUsers()
  const { isUpdating, updateUser } = useUpdateUser()
  const { data } = useUsers()

  const processing = isAdding || isDeleting || isUpdating

  const handleAddUser = async (user: Partial<IUser>) => {
    addUser(user as IUser)
      .then(() => {
        snackbar.success(
          t('userManagement.notifications.addSuccess', {
            user: `${user.firstName} ${user.lastName}`,
          }),
        )
        setOpenUserDialog(false)
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  const handleDeleteUsers = async () => {
    deleteUsers(userDeleted)
      .then(() => {
        snackbar.success(t('userManagement.notifications.deleteSuccess'))
        setSelected([])
        setUserDeleted([])
        setOpenConfirmDeleteDialog(false)
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  const handleUpdateUser = async (user: IUser) => {
    updateUser(user)
      .then(() => {
        snackbar.success(
          t('userManagement.notifications.updateSuccess', {
            user: `${user.firstName} ${user.lastName}`,
          }),
        )
        setOpenUserDialog(false)
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

  const handleCloseUserDialog = () => {
    setUserUpdated(undefined)
    setOpenUserDialog(false)
  }

  const handleOpenConfirmDeleteDialog = (userIds: string[]) => {
    setUserDeleted(userIds)
    setOpenConfirmDeleteDialog(true)
  }

  const handleOpenUserDialog = (user?: IUser) => {
    setUserUpdated(user)
    setOpenUserDialog(true)
  }

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected)
  }

  return (
    <React.Fragment>
      <BaseAppBar>
        {!selected.length ? (
          <BaseToolbar title={t('userManagement.toolbar.title')}>
            <Fab
              aria-label="logout"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenUserDialog()}
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
      <UserTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenUserDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        users={data}
      />
      <ConfirmDialog
        description={t('userManagement.confirmations.delete')}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteUsers}
        open={openConfirmDeleteDialog}
        title={t('common.confirmation')}
      />
      {openUserDialog && (
        <UserDialog
          onAdd={handleAddUser}
          onClose={handleCloseUserDialog}
          onUpdate={handleUpdateUser}
          open={openUserDialog}
          processing={processing}
          user={userUpdated}
        />
      )}
    </React.Fragment>
  )
}

export default UserManagement
