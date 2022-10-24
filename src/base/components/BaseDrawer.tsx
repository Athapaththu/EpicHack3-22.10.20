import AccountTreeIcon from '@mui/icons-material/AccountTree'
import Assessment from '@mui/icons-material/Assessment'
import BarChartIcon from '@mui/icons-material/BarChart'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import PublicIcon from '@mui/icons-material/Public'
import QuizIcon from '@mui/icons-material/Quiz'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import Logo from '../../core/components/Logo'
import { drawerCollapsedWidth, drawerWidth } from '../../core/config/layout'
import { useAuth } from '../../modules/auth/contexts/AuthProvider'
import {
  COUNTRY_MANAGEMENT_ROUTE,
  DASHBOARD_ROUTE,
  HELP_ROUTE,
  ORGANIZATION_MANAGEMENT_ROUTE,
  PROFILE_ROUTE,
  QUESTION_MANAGEMENT_ROUTE,
  REPORT_ROUTE,
  ROOT_ROUTE,
  USER_MANAGEMENT_ROUTE,
} from '../constants/routes'

type BaseDrawerProps = {
  collapsed: boolean
  mobileOpen: boolean
  onDrawerToggle: () => void
  onSettingsToggle: () => void
}

export const menuItems = [
  {
    icon: HomeIcon,
    key: 'admin.drawer.menu.home',
    path: `/${ROOT_ROUTE}`,
  },
  {
    icon: BarChartIcon,
    key: 'admin.drawer.menu.dashboard',
    path: `/${ROOT_ROUTE}/${DASHBOARD_ROUTE}`,
  },
  {
    icon: PeopleIcon,
    key: 'admin.drawer.menu.userManagement',
    path: `/${ROOT_ROUTE}/${USER_MANAGEMENT_ROUTE}`,
  },
  {
    icon: PublicIcon,
    key: 'admin.drawer.menu.countryManagement',
    path: `/${ROOT_ROUTE}/${COUNTRY_MANAGEMENT_ROUTE}`,
  },
  {
    icon: CorporateFareIcon,
    key: 'admin.drawer.menu.organizationManagement',
    path: `/${ROOT_ROUTE}/${ORGANIZATION_MANAGEMENT_ROUTE}`,
  },
  {
    icon: QuizIcon,
    key: 'admin.drawer.menu.questionManagement',
    path: `/${ROOT_ROUTE}/${QUESTION_MANAGEMENT_ROUTE}`,
  },
  {
    icon: AccountTreeIcon,
    key: 'admin.drawer.menu.projects',
    path: `/${ROOT_ROUTE}/projects`,
  },
  {
    icon: HelpCenterIcon,
    key: 'admin.drawer.menu.help',
    path: `/${ROOT_ROUTE}/${HELP_ROUTE}`,
  },
  {
    icon: Assessment,
    key: 'admin.drawer.menu.report',
    path: `/${ROOT_ROUTE}/${REPORT_ROUTE}`,
  },
]

const BaseDrawer = ({
  collapsed,
  mobileOpen,
  onDrawerToggle,
  onSettingsToggle,
}: BaseDrawerProps): JSX.Element => {
  const { userInfo } = useAuth()
  const { t } = useTranslation()

  const width = collapsed ? drawerCollapsedWidth : drawerWidth

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Logo sx={{ display: 'flex', p: 4 }} />
      <List component="nav" sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            component={NavLink}
            key={item.path}
            activeClassName="Mui-selected"
            end={true}
            to={`${item.path}`}
          >
            <ListItemAvatar>
              <Avatar sx={{ color: 'inherit', bgcolor: 'transparent' }}>
                <item.icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t(item.key)}
              sx={{
                display: collapsed ? 'none' : 'block',
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List component="nav" sx={{ p: 2 }}>
        <ListItem
          button
          component={NavLink}
          to={`/${ROOT_ROUTE}/${PROFILE_ROUTE}`}
        >
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          {userInfo && (
            <ListItemText
              primary={`${userInfo.firstName} ${userInfo.lastName}`}
              sx={{
                display: collapsed ? 'none' : 'block',
              }}
            />
          )}
        </ListItem>
        <ListItem button onClick={onSettingsToggle}>
          <ListItemAvatar>
            <Avatar>
              <SettingsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={t('admin.drawer.menu.settings')}
            sx={{
              display: collapsed ? 'none' : 'block',
            }}
          />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box
      aria-label="Admin drawer"
      component="nav"
      sx={{
        width: { lg: width },
        flexShrink: { lg: 0 },
      }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default BaseDrawer
