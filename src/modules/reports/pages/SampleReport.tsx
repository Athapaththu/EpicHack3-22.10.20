import 'webdatarocks/webdatarocks.css'

import AddIcon from '@mui/icons-material/Add'
import { Card, Fab } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as WebDataRocks from 'react-webdatarocks'

import BaseAppBar from '../../../base/components/BaseAppBar'
import BaseToolbar from '../../../base/components/BaseToolbar'

const SampleReport = (): JSX.Element => {
  const { t } = useTranslation()

  const ref: React.RefObject<WebDataRocks.Pivot> =
    React.useRef<WebDataRocks.Pivot>(null)

  const onReportComplete = () => {
    if (ref.current) {
      ref.current.webdatarocks.off('reportcomplete')
      console.log(ref.current.webdatarocks)
    }
  }
  return (
    <React.Fragment>
      <BaseAppBar>
        <BaseToolbar title={t('calendar.title')}>
          <Fab
            aria-label="add event"
            color="primary"
            onClick={() => console.log('clicked')}
            size="small"
          >
            <AddIcon />
          </Fab>
        </BaseToolbar>
      </BaseAppBar>
      <Card>
        <WebDataRocks.Pivot
          ref={ref}
          toolbar={true}
          width="100%"
          reportcomplete={() => onReportComplete()}
          report="https://cdn.webdatarocks.com/reports/report.json"
        ></WebDataRocks.Pivot>
      </Card>
    </React.Fragment>
  )
}

export default SampleReport
