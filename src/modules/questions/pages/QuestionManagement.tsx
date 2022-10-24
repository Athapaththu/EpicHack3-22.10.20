import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import BaseAppBar from '../../../base/components/BaseAppBar'
import BaseToolbar from '../../../base/components/BaseToolbar'
import ConfirmDialog from '../../../core/components/ConfirmDialog'
import SelectToolbar from '../../../core/components/SelectToolbar'
import { useSnackbar } from '../../../core/contexts/SnackbarProvider'
import QuestionDialog from '../components/QuestionDialog'
import QuestionTable from '../components/QuestionTable'
import { useAddQuestion } from '../hooks/useAddQuestion'
import { useDeleteQuestions } from '../hooks/useDeleteQuestions'
import { useQuestions } from '../hooks/useQuestions'
import { useUpdateQuestion } from '../hooks/useUpdateQuestion'
import { IQuestion } from '../types/question'

const QuestionManagement = (): JSX.Element => {
  const snackbar = useSnackbar()
  const { t } = useTranslation()

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [questionDeleted, setQuestionDeleted] = useState<string[]>([])
  // eslint-disable-next-line prettier/prettier
  const [questionUpdated, setQuestionUpdated] = useState<IQuestion | undefined>(undefined)
  const { addQuestion, isAdding } = useAddQuestion()
  const { deleteQuestions, isDeleting } = useDeleteQuestions()
  const { isUpdating, updateQuestion } = useUpdateQuestion()
  const { data } = useQuestions()

  const processing = isAdding || isDeleting || isUpdating

  const handleAddQuestion = async (question: Partial<IQuestion>) => {
    addQuestion(question as IQuestion)
      .then(() => {
        snackbar.success(
          t('questionManagement.notifications.addSuccess', {
            question: `${question.firstName} ${question.lastName}`,
          }),
        )
        setOpenQuestionDialog(false)
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  const handleDeleteQuestions = async () => {
    deleteQuestions(questionDeleted)
      .then(() => {
        snackbar.success(t('questionManagement.notifications.deleteSuccess'))
        setSelected([])
        setQuestionDeleted([])
        setOpenConfirmDeleteDialog(false)
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'))
      })
  }

  const handleUpdateQuestion = async (question: IQuestion) => {
    updateQuestion(question)
      .then(() => {
        snackbar.success(
          t('questionManagement.notifications.updateSuccess', {
            question: `${question.firstName} ${question.lastName}`,
          }),
        )
        setOpenQuestionDialog(false)
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

  const handleCloseQuestionDialog = () => {
    setQuestionUpdated(undefined)
    setOpenQuestionDialog(false)
  }

  const handleOpenConfirmDeleteDialog = (questionIds: string[]) => {
    setQuestionDeleted(questionIds)
    setOpenConfirmDeleteDialog(true)
  }

  const handleOpenQuestionDialog = (question?: IQuestion) => {
    setQuestionUpdated(question)
    setOpenQuestionDialog(true)
  }

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected)
  }

  return (
    <React.Fragment>
      <BaseAppBar>
        {!selected.length ? (
          <BaseToolbar title={t('questionManagement.toolbar.title')}>
            <Fab
              aria-label="logout"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenQuestionDialog()}
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
      <QuestionTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenQuestionDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        question={data}
      />
      <ConfirmDialog
        description={t('questionManagement.confirmations.delete')}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteQuestions}
        open={openConfirmDeleteDialog}
        title={t('common.confirmation')}
      />
      {openQuestionDialog && (
        <QuestionDialog
          onAdd={handleAddQuestion}
          onClose={handleCloseQuestionDialog}
          onUpdate={handleUpdateQuestion}
          open={openQuestionDialog}
          processing={processing}
          question={questionUpdated}
        />
      )}
    </React.Fragment>
  )
}

export default QuestionManagement
