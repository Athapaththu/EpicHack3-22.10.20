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

import BaseAppBar from '../../../base/components/BaseAppBar'
import BaseToolbar from '../../../base/components/BaseToolbar'
import {
  ORGANIZATION_MANAGEMENT_ROUTE,
  ROOT_ROUTE,
} from '../../../base/constants/routes'

const branchLists = [
  {
    type: 'organizationManagement.branchLists.branch.type',
    countryName: 'organizationManagement.branchLists.branch.countryName',
    userName: 'organizationManagement.branchLists.branch.userName',
  },
  {
    type: 'organizationManagement.branchLists.branch.type',
    countryName: 'organizationManagement.branchLists.branch.countryName',
    userName: 'organizationManagement.branchLists.branch.userName',
  },
  {
    type: 'organizationManagement.branchLists.branch.type',
    countryName: 'organizationManagement.branchLists.branch.countryName',
    userName: 'organizationManagement.branchLists.branch.userName',
  },
  {
    type: 'organizationManagement.branchLists.branch.type',
    countryName: 'organizationManagement.branchLists.branch.countryName',
    userName: 'organizationManagement.branchLists.branch.userName',
  },
  {
    type: 'organizationManagement.branchLists.branch.type',
    countryName: 'organizationManagement.branchLists.branch.countryName',
    userName: 'organizationManagement.branchLists.branch.userName',
  },
]

const OrganizationBranches = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <BaseAppBar>
        <BaseToolbar />
      </BaseAppBar>
      <Container maxWidth="sm">
        <Typography align="center" marginBottom={6} variant="h2">
          {t('organizationManagement.branchLists.faq.title')}
        </Typography>
        {branchLists.map((branchList, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="p" variant="h6">
                {t('organizationManagement.branchLists.faq.type')} :{' '}
                {t(branchList.type)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {t('organizationManagement.branchLists.faq.countryName')} :{' '}
                {t(branchList.countryName)}
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography color="text.secondary">
                {t('organizationManagement.branchLists.faq.userName')} :{' '}
                {t(branchList.userName)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Link
          component={RouterLink}
          to={`/${ROOT_ROUTE}/${ORGANIZATION_MANAGEMENT_ROUTE}`}
          variant="body2"
        >
          {t('organizationManagement.branchLists.faq.noAnswerLink')}
        </Link>
      </Container>
    </React.Fragment>
  )
}

export default OrganizationBranches
