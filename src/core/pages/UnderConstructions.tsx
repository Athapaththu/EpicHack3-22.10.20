import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'

import { ROOT_ROUTE } from '../../base/constants/routes'
import Result from '../../core/components/Result'
import { ReactComponent as ConstructionsSvg } from '../assets/constructions.svg'

const UnderConstructions = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Result
      extra={
        <Button
          color="secondary"
          component={RouterLink}
          to={`/${ROOT_ROUTE}`}
          variant="contained"
        >
          {t('common.backHome')}
        </Button>
      }
      image={<ConstructionsSvg />}
      maxWidth="sm"
      subTitle={t('common.errors.underConstructions.subTitle')}
      title={t('common.errors.underConstructions.title')}
    />
  )
}

export default UnderConstructions
