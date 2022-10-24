import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'

import { COUNTRY_MANAGEMENT_ROUTE, ROOT_ROUTE } from '../constants/routes'

const countries = [
  {
    id: '1',
    firstName: 'Rhys',
    gender: 'M',
    lastName: 'Arriaga',
    role: 'Admin',
  },
  {
    id: '2',
    firstName: 'Laura',
    gender: 'F',
    lastName: 'Core',
    role: 'Member',
  },
  {
    id: '3',
    firstName: 'Joshua',
    gender: 'M',
    lastName: 'Jagger',
    role: 'Member',
  },
]

const CountriesWidget = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader title={t('dashboard.countries.title')} />
      <CardContent>
        <List>
          {countries.map((country) => (
            <ListItem disableGutters key={country.id}>
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Go to country details"
                  component={RouterLink}
                  edge="end"
                  to={`/${ROOT_ROUTE}/${COUNTRY_MANAGEMENT_ROUTE}`}
                >
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default CountriesWidget
