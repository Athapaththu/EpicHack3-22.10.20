import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
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
import { IQuestion } from '../types/question'

interface HeadCell {
  id: string
  label: string
  align: 'center' | 'left' | 'right'
}

const headCells: HeadCell[] = [
  {
    id: 'question',
    align: 'left',
    label: 'questionManagement.table.headers.question',
  },

  {
    id: 'module',
    align: 'center',
    label: 'questionManagement.table.headers.module',
  },
  {
    id: 'order',
    align: 'center',
    label: 'questionManagement.table.headers.order',
  },
  {
    id: 'status',
    align: 'center',
    label: 'questionManagement.table.headers.status',
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
              'aria-label': 'select all question',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sx={{ py: 0 }}>
            {t(headCell.label)}
          </TableCell>
        ))}
        <TableCell align="right" sx={{ py: 0 }}>
          {t('questionManagement.table.headers.actions')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

type QuestionRowProps = {
  index: number
  onCheck: (id: string) => void
  onDelete: (questionIds: string[]) => void
  onEdit: (question: IQuestion) => void
  processing: boolean
  selected: boolean
  question: IQuestion
}

const QuestionRow = ({
  index,
  onCheck,
  onDelete,
  onEdit,
  processing,
  selected,
  question,
}: QuestionRowProps) => {
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
    onDelete([question.id])
  }

  const handleEdit = () => {
    handleCloseActions()
    onEdit(question)
  }

  return (
    <TableRow
      aria-checked={selected}
      tabIndex={-1}
      key={question.id}
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
          onClick={() => onCheck(question.id)}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 3 }}>
            <HelpOutlineIcon />
          </Avatar>
          <Box>
            <Typography component="div" variant="h6">
              {question.questionNumber}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {question.questionDescription}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box>
          <Typography component="div" variant="h6">
            {question.module}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box>
          <Typography component="div" variant="h6">
            {question.order}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="center">
        {question.disabled ? (
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
          id="question-row-menu-button"
          aria-label="question actions"
          aria-controls="question-row-menu"
          aria-haspopup="true"
          aria-expanded={openActions ? 'true' : 'false'}
          disabled={processing}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="question-row-menu"
          anchorEl={anchorEl}
          aria-labelledby="question-row-menu-button"
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

type QuestionTableProps = {
  processing: boolean
  onDelete: (questionIds: string[]) => void
  onEdit: (question: IQuestion) => void
  onSelectedChange: (selected: string[]) => void
  selected: string[]
  question?: IQuestion[]
}

const QuestionTable = ({
  onDelete,
  onEdit,
  onSelectedChange,
  processing,
  selected,
  question = [],
}: QuestionTableProps): JSX.Element => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = selectUtils.selectAll(question)
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

  if (question.length === 0) {
    return <Empty title="No question yet" />
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
            rowCount={question.length}
          />
          <TableBody>
            {question
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question, index) => (
                <QuestionRow
                  index={index}
                  key={question.id}
                  onCheck={handleClick}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  processing={processing}
                  selected={isSelected(question.id)}
                  question={question}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={question.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  )
}

export default QuestionTable
