import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import MoreVertIcon from '@mui/icons-material/MoreVert'
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
import { ICountry } from '../types/country'

interface HeadCell {
  id: string
  label: string
  align: 'center' | 'left' | 'right'
}

const headCells: HeadCell[] = [
  {
    id: 'isoCode',
    align: 'left',
    label: 'countryManagement.table.headers.isoCode',
  },
  {
    id: 'appCountry',
    align: 'center',
    label: 'countryManagement.table.headers.appCountry',
  },
  {
    id: 'status',
    align: 'center',
    label: 'countryManagement.table.headers.status',
  },
]

interface EnhancedTableProps {
  numSelected: number
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
              'aria-label': 'select all countries',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sx={{ py: 0 }}>
            {t(headCell.label)}
          </TableCell>
        ))}
        <TableCell align="right" sx={{ py: 0 }}>
          {t('countryManagement.table.headers.actions')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

type CountriesRowProps = {
  index: number
  onCheck: (id: string) => void
  onDelete: (countryIds: string[]) => void
  onEdit: (country: ICountry) => void
  processing: boolean
  selected: boolean
  country: ICountry
}

const CountriesRow = ({
  index,
  onCheck,
  onDelete,
  onEdit,
  processing,
  selected,
  country,
}: CountriesRowProps) => {
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

  const handleDelete = () => {
    handleCloseActions()
    onDelete([country.id])
  }

  const handleEdit = () => {
    handleCloseActions()
    onEdit(country)
  }

  return (
    <TableRow
      aria-checked={selected}
      tabIndex={-1}
      key={country.id}
      selected={selected}
      sx={{ '& td': { bgcolor: 'background.paper' } }}
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
          onClick={() => onCheck(country.id)}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 3 }}>
            <FlagCircleIcon />
          </Avatar>
          <Box>
            <Typography component="div" variant="h6">
              {country.newCountry}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {country.isoCode}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">{country.appCountry}</TableCell>
      <TableCell align="center">
        {country.disabled ? (
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
          id="country-row-menu-button"
          aria-label="country actions"
          aria-controls="country-row-menu"
          aria-haspopup="true"
          aria-expanded={openActions ? 'true' : 'false'}
          disabled={processing}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="country-row-menu"
          anchorEl={anchorEl}
          aria-labelledby="country-row-menu-button"
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

type CountriesTableProps = {
  processing: boolean
  onDelete: (countryIds: string[]) => void
  onEdit: (country: ICountry) => void
  onSelectedChange: (selected: string[]) => void
  selected: string[]
  countries?: ICountry[]
}

const CountriesTable = ({
  onDelete,
  onEdit,
  onSelectedChange,
  processing,
  selected,
  countries = [],
}: CountriesTableProps): JSX.Element => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = selectUtils.selectAll(countries)
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

  if (countries.length === 0) {
    return <Empty title="No country yet" />
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
            rowCount={countries.length}
          />
          <TableBody>
            {countries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country, index) => (
                <CountriesRow
                  index={index}
                  key={country.id}
                  onCheck={handleClick}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  processing={processing}
                  selected={isSelected(country.id)}
                  country={country}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  )
}

export default CountriesTable
