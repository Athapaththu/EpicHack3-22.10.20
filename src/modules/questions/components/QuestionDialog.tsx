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
  Tab,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { IQuestion } from '../types/question'

type QuestionDialogProps = {
  onAdd: (question: Partial<IQuestion>) => void
  onClose: () => void
  onUpdate: (question: IQuestion) => void
  open: boolean
  processing: boolean
  question?: IQuestion
}

const QuestionDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  question,
}: QuestionDialogProps): JSX.Element => {
  const { t } = useTranslation()

  const editMode = Boolean(question && question.id)

  const handleSubmit = (values: Partial<IQuestion>) => {
    if (question && question.id) {
      onUpdate({ ...values, id: question.id } as IQuestion)
    } else {
      onAdd(values)
    }
  }

  const formik = useFormik({
    initialValues: {
      disabled: question ? question.disabled : false,
      questionCode: question ? question.questionCode : '',
      questionPre: question ? question.questionPre : '',
      description: question ? question.description : '',
      newQuestion: question ? question.newQuestion : '',
      moduleNo: question ? question.moduleNo : '',
      orderNo: question ? question.orderNo : '',
      geographicArea: question ? question.geographicArea : '',
      departmentName: question ? question.departmentName : '',
      designation: question ? question.designation : '',
      questionWeights: question ? question.questionWeights : '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('common.validations.email'))
        .required(t('common.validations.required')),
      questionCode: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      newQuestion: Yup.string()
        .max(30, t('common.validations.max', { size: 30 }))
        .required(t('common.validations.required')),
      questionPre: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      description: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      moduleNo: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      orderNo: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      questionType: Yup.string().required(t('common.validations.required')),
    }),
    onSubmit: handleSubmit,
  })

  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="question-dialog-title"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="question-dialog-title">
          {editMode
            ? t('questionManagement.modal.edit.title')
            : t('questionManagement.modal.add.title')}
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
                      <Tab label="Question" value="1" />
                      <Tab label="Meta" value="2" />
                      <Tab label="Weight" value="3" />
                    </TabList>
                  </Box>
                  {/* tab start */}
                  {/* tab 1 */}
                  <TabPanel value="1">
                    <form onSubmit={formik.handleSubmit} noValidate>
                      <DialogTitle>
                        {editMode
                          ? t('questionManagement.topic.newQuestion.label')
                          : t('questionManagement.topic.newQuestion.label')}
                      </DialogTitle>
                      <DialogContent>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="questionCode"
                          label={t(
                            'questionManagement.form.questionCode.label',
                          )}
                          name="questionCode"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.questionCode}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.questionCode &&
                            Boolean(formik.errors.questionCode)
                          }
                          helperText={
                            formik.touched.questionCode &&
                            formik.errors.questionCode
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="questionPre"
                          label={t('questionManagement.form.questionPre.label')}
                          name="questionPre"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.questionPre}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.questionPre &&
                            Boolean(formik.errors.questionPre)
                          }
                          helperText={
                            formik.touched.questionPre &&
                            formik.errors.questionPre
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="description"
                          label={t('questionManagement.form.description.label')}
                          name="description"
                          autoComplete="given-name"
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
                          id="moduleNo"
                          label={t('questionManagement.form.moduleNo.label')}
                          name="moduleNo"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.moduleNo}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.moduleNo &&
                            Boolean(formik.errors.moduleNo)
                          }
                          helperText={
                            formik.touched.moduleNo && formik.errors.moduleNo
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="orderNo"
                          label={t('questionManagement.form.orderNo.label')}
                          name="orderNo"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.orderNo}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.orderNo &&
                            Boolean(formik.errors.orderNo)
                          }
                          helperText={
                            formik.touched.orderNo && formik.errors.orderNo
                          }
                        />
                      </DialogContent>
                    </form>
                  </TabPanel>
                  {/* tab 2 */}
                  <TabPanel value="2">
                    <form onSubmit={formik.handleSubmit} noValidate>
                      <DialogContent>
                        <DialogTitle>
                          {editMode
                            ? t('questionManagement.topic.metaQuestion.label')
                            : t('questionManagement.topic.metaQuestion.label')}
                        </DialogTitle>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="questionCode"
                          label={t(
                            'questionManagement.form.questionCode.label',
                          )}
                          name="questionCode"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.questionCode}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.questionCode &&
                            Boolean(formik.errors.questionCode)
                          }
                          helperText={
                            formik.touched.questionCode &&
                            formik.errors.questionCode
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="questionPre"
                          label={t('questionManagement.form.questionPre.label')}
                          name="questionPre"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.questionPre}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.questionPre &&
                            Boolean(formik.errors.questionPre)
                          }
                          helperText={
                            formik.touched.questionPre &&
                            formik.errors.questionPre
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="orderNo"
                          label={t('questionManagement.form.orderNo.label')}
                          name="orderNo"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.orderNo}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.orderNo &&
                            Boolean(formik.errors.orderNo)
                          }
                          helperText={
                            formik.touched.orderNo && formik.errors.orderNo
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
                          id="questionWeights"
                          label={t(
                            'questionManagement.form.questionWeights.label',
                          )}
                          name="questionWeights"
                          autoComplete="given-name"
                          disabled={processing}
                          value={formik.values.questionWeights}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.questionWeights &&
                            Boolean(formik.errors.questionWeights)
                          }
                          helperText={
                            formik.touched.questionWeights &&
                            formik.errors.questionWeights
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
              ? t('questionManagement.modal.edit.action')
              : t('questionManagement.modal.add.action')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default QuestionDialog
