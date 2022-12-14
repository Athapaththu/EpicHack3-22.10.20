import { Box, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { PUBLIC_URL_ROUTE } from '../../base/constants/routes'

const Footer = (): JSX.Element => {
  return (
    <Box sx={{ p: 6 }} component="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link
          color="inherit"
          component={RouterLink}
          to={`${PUBLIC_URL_ROUTE}/`}
        >
          {process.env.REACT_APP_NAME}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  )
}

export default Footer
