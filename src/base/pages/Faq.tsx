import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Link,
  Typography,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'

import BaseAppBar from '../components/BaseAppBar'
import BaseToolbar from '../components/BaseToolbar'
import { HELP_ROUTE, ROOT_ROUTE } from '../constants/routes'

const questions = [
  {
    title: 'faq.questions.title1',
    answer: 'faq.questions.answer1',
  },
  {
    title: 'faq.questions.title2',
    answer: 'faq.questions.answer2',
  },
  {
    title: 'faq.questions.title3',
    answer: 'faq.questions.answer3',
  },
  {
    title: 'faq.questions.title4',
    answer: 'faq.questions.answer4',
  },
  {
    title: 'faq.questions.title5',
    answer: 'faq.questions.answer5',
  },
  {
    title: 'faq.questions.title6',
    answer: 'faq.questions.answer6',
  },
]

const Faq = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <BaseAppBar>
        <BaseToolbar />
      </BaseAppBar>
      <Container maxWidth="sm">
        <Typography align="center" marginBottom={6} variant="h2">
          {t('faq.title')}
        </Typography>
        {questions.map((question, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="p" variant="h6">
                {t(question.title)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {t(question.answer)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Link
          component={RouterLink}
          to={`/${ROOT_ROUTE}/${HELP_ROUTE}`}
          variant="body2"
        >
          {t('faq.noAnswerLink')}
        </Link>
      </Container>
    </React.Fragment>
  )
}

export default Faq
