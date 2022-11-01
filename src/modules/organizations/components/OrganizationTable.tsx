import DeleteIcon from '@mui/icons-material/Delete'
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RoofingSharpIcon from '@mui/icons-material/RoofingSharp'
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Empty from '../../../core/components/Empty'
import * as selectUtils from '../../../core/utils/selectUtils'
import { IOrganization } from '../types/organization'

interface HeadCell {
  id: string
  label: string
  align: 'center' | 'left' | 'right'
}

const headCells: HeadCell[] = [
  {
    id: 'organization',
    align: 'left',
    label: 'organizationManagement.table.headers.organization',
  },
  {
    id: 'organizationType',
    align: 'center',
    label: 'organizationManagement.table.headers.organizationType',
  },
  {
    id: 'status',
    align: 'center',
    label: 'organizationManagement.table.headers.status',
  },
]

interface EnhancedTableProps {
  numSelected: number
  // eslint-disable-next-line no-unused-vars
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
}

function EnhancedTableHead({
  onSelectAllClick,
  numSelected,
  rowCount,
}: EnhancedTableProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <TableHead>
      <TableRow sx={{ '& th': { border: 0 } }}>
        <TableCell sx={{ py: 0 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all organizations',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sx={{ py: 0 }}>
            {t(headCell.label)}
          </TableCell>
        ))}
        <TableCell align="right" sx={{ py: 0 }}>
          {t('organizationManagement.table.headers.actions')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

type OrganizationRowProps = {
  index: number
  // eslint-disable-next-line no-unused-vars
  onCheck: (id: string) => void
  // eslint-disable-next-line no-unused-vars
  onDelete: (organizationIds: string[]) => void
  // eslint-disable-next-line no-unused-vars
  onEdit: (organization: IOrganization) => void
  // eslint-disable-next-line no-unused-vars
  onAddBranch: (organizationId: string) => void
  processing: boolean
  selected: boolean
  organization: IOrganization
}

const OrganizationRow = ({
  index,
  onCheck,
  onDelete,
  onEdit,
  onAddBranch,
  processing,
  selected,
  organization,
}: OrganizationRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { t } = useTranslation()

  const labelId = `enhanced-table-checkbox-${index}`
  const openActions = Boolean(anchorEl)

  const handleOpenActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseActions = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleCloseActions()
    onEdit(organization)
  }
  const handleBranch = () => {
    handleCloseActions()
    onAddBranch(organization.id)
  }
  const handleDelete = () => {
    handleCloseActions()
    onDelete([organization.id])
  }

  return (
    <TableRow
      aria-checked={selected}
      tabIndex={-1}
      key={organization.id}
      selected={selected}
      sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
    >
      <TableCell
        padding="checkbox"
        sx={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
      >
        <Checkbox
          color="primary"
          checked={selected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
          onClick={() => onCheck(organization.id)}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 3 }}>
            <RoofingSharpIcon />
          </Avatar>
          <Box>
            <Typography component="div" variant="h6">
              {organization.organizationName}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {organization.countryName}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box>
          <Typography component="div" variant="h6">
            {organization.organizationType}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {organization.geographicArea}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="center">
        {organization.disabled ? (
          <Chip label="Disabled" />
        ) : (
          <Chip color="primary" label="Active" />
        )}
      </TableCell>
      <TableCell
        align="right"
        sx={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}
      >
        <IconButton
          id="organization-row-menu-button"
          aria-label="organization actions"
          aria-controls="organization-row-menu"
          aria-haspopup="true"
          aria-expanded={openActions ? 'true' : 'false'}
          disabled={processing}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="organization-row-menu"
          anchorEl={anchorEl}
          aria-labelledby="organization-row-menu-button"
          open={openActions}
          onClose={handleCloseActions}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>{' '}
            {t('common.edit')}
          </MenuItem>
          <MenuItem onClick={handleBranch}>
            <ListItemIcon>
              <DnsOutlinedIcon />
            </ListItemIcon>{' '}
            {t('common.branch')}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>{' '}
            {t('common.delete')}
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  )
}

type OrganizationTableProps = {
  processing: boolean
  // eslint-disable-next-line no-unused-vars
  onDelete: (organizationIds: string[]) => void
  // eslint-disable-next-line no-unused-vars
  onEdit: (organization: IOrganization) => void
  // eslint-disable-next-line no-unused-vars
  onAddBranch: (organizationId: string) => void
  // eslint-disable-next-line no-unused-vars
  onSelectedChange: (selected: string[]) => void
  selected: string[]
  organizations?: IOrganization[]
}

const OrganizationTable = ({
  onDelete,
  onEdit,
  onAddBranch,
  onSelectedChange,
  processing,
  selected,
  organizations = [],
}: OrganizationTableProps): JSX.Element => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = selectUtils.selectAll(organizations)
      onSelectedChange(newSelecteds)
      return
    }
    onSelectedChange([])
  }

  const handleClick = (id: string) => {
    const newSelected: string[] = selectUtils.selectOne(selected, id)
    onSelectedChange(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  if (organizations.length === 0) {
    return <Empty title="No organization yet" />
  }

  return (
    <React.Fragment>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          sx={{
            minWidth: 600,
            borderCollapse: 'separate',
            borderSpacing: '0 1rem',
          }}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={organizations.length}
          />
          <TableBody>
            {organizations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((organization, index) => (
                <OrganizationRow
                  index={index}
                  key={organization.id}
                  onCheck={handleClick}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onAddBranch={onAddBranch}
                  processing={processing}
                  selected={isSelected(organization.id)}
                  organization={organization}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={organizations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  )
}

export default OrganizationTable
