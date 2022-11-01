import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  COUNTRY_MANAGEMENT_PERMISSION,
  DASHBOARD_PERMISSION,
  FAQ_PERMISSION,
  HELP_PERMISSION,
  HOME_PERMISSION,
  ORGANIZATION_BRANCHES_PERMISSION,
  ORGANIZATION_MANAGEMENT_PERMISSION,
  PROFILE_ACTIVITY_PERMISSION,
  PROFILE_EMPLOYMENT_PERMISSION,
  PROFILE_INFORMATION_PERMISSION,
  PROFILE_PASSWORD_PERMISSION,
  PROFILE_PERMISSION,
  QUESTION_MANAGEMENT_PERMISSION,
  REPORT_PERMISSION,
  ROOT_PERMISSION,
  USER_MANAGEMENT_PERMISSION,
} from './base/constants/permissions'
import {
  COMMON_403_ROUTE,
  COMMON_404_ROUTE,
  COMMON_UNDER_CONSTRUCTION_ROUTE,
  COUNTRY_MANAGEMENT_ROUTE,
  DASHBOARD_ROUTE,
  FAQ_ROUTE,
  HELP_ROUTE,
  HOME_ROUTE,
  ORGANIZATION_BRANCHES_ROUTE,
  ORGANIZATION_MANAGEMENT_ROUTE,
  PROFILE_ACTIVITY_ROUTE,
  PROFILE_EMPLOYMENT_ROUTE,
  PROFILE_INFORMATION_ROUTE,
  PROFILE_PASSWORD_ROUTE,
  PROFILE_ROUTE,
  PUBLIC_FORGOT_PASSWORD_ROUTE,
  PUBLIC_FORGOT_PASSWORD_SUBMIT_ROUTE,
  PUBLIC_LANDING_ROUTE,
  PUBLIC_LOGIN_ROUTE,
  PUBLIC_REGISTER_ROUTE,
  PUBLIC_URL_ROUTE,
  QUESTION_MANAGEMENT_ROUTE,
  REPORT_ROUTE,
  ROOT_ROUTE,
  USER_MANAGEMENT_ROUTE,
} from './base/constants/routes'
import PrivateRoute from './core/components/PrivateRoute'

// Admin
const Admin = lazy(() => import('./base/layouts/AdminLayout'))
const Dashboard = lazy(() => import('./base/pages/Dashboard'))
const Faq = lazy(() => import('./base/pages/Faq'))
const HelpCenter = lazy(() => import('./base/pages/HelpCenter'))
const Home = lazy(() => import('./base/pages/Home'))
const Profile = lazy(() => import('./base/pages/Profile'))
const ProfileActivity = lazy(() => import('./base/pages/ProfileActivity'))
const ProfileInformation = lazy(() => import('./base/pages/ProfileInformation'))
const ProfileEmployment = lazy(() => import('./base/pages/ProfileEmployment'))
const ProfilePassword = lazy(() => import('./base/pages/ProfilePassword'))

// Auth
const ForgotPassword = lazy(() => import('./modules/auth/pages/ForgotPassword'))
const ForgotPasswordSubmit = lazy(
  () => import('./modules/auth/pages/ForgotPasswordSubmit'),
)
const Login = lazy(() => import('./modules/auth/pages/Login'))
const Register = lazy(() => import('./modules/auth/pages/Register'))

// Core
const Forbidden = lazy(() => import('./core/pages/Forbidden'))
const NotFound = lazy(() => import('./core/pages/NotFound'))
const UnderConstructions = lazy(() => import('./core/pages/UnderConstructions'))

// Landing
const Landing = lazy(() => import('./modules/landing/pages/Landing'))

// Users
const UserManagement = lazy(
  () => import('./modules/users/pages/UserManagement'),
)

// Countries
const CountryManagement = lazy(
  () => import('./modules/countries/pages/CountryManagement'),
)

// Organizations
const OrganizationManagement = lazy(
  () => import('./modules/organizations/pages/OrganizationManagement'),
)
const OrganizationBranches = lazy(
  () => import('./modules/organizations/components/OrganizationBranches'),
)
// questions
const QuestionManagement = lazy(
  () => import('./modules/questions/pages/QuestionManagement'),
)

// Reports
const SampleReport = lazy(() => import('./modules/reports/pages/SampleReport'))

const AppRoutes = (): JSX.Element => {
  return (
    <Routes basename={PUBLIC_URL_ROUTE}>
      {/* Public routes */}
      <Route path={PUBLIC_LANDING_ROUTE} element={<Landing />} />
      <Route path={PUBLIC_LOGIN_ROUTE} element={<Login />} />
      <Route path={PUBLIC_REGISTER_ROUTE} element={<Register />} />
      <Route path={PUBLIC_FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
      <Route
        path={PUBLIC_FORGOT_PASSWORD_SUBMIT_ROUTE}
        element={<ForgotPasswordSubmit />}
      />

      {/* Logged user routes */}
      <PrivateRoute
        path={ROOT_ROUTE}
        element={<Admin />}
        permission={ROOT_PERMISSION}
      >
        <PrivateRoute
          path={HOME_ROUTE}
          element={<Home />}
          permission={HOME_PERMISSION}
        />
        <PrivateRoute
          path={DASHBOARD_ROUTE}
          element={<Dashboard />}
          permission={DASHBOARD_PERMISSION}
        />
        <PrivateRoute
          path={FAQ_ROUTE}
          element={<Faq />}
          permission={FAQ_PERMISSION}
        />
        <PrivateRoute
          path={HELP_ROUTE}
          element={<HelpCenter />}
          permission={HELP_PERMISSION}
        />
        <PrivateRoute
          path={PROFILE_ROUTE}
          element={<Profile />}
          permission={PROFILE_PERMISSION}
        >
          <PrivateRoute
            path={PROFILE_ACTIVITY_ROUTE}
            element={<ProfileActivity />}
            permission={PROFILE_ACTIVITY_PERMISSION}
          />
          <PrivateRoute
            path={PROFILE_INFORMATION_ROUTE}
            element={<ProfileInformation />}
            permission={PROFILE_INFORMATION_PERMISSION}
          />
          <PrivateRoute
            path={PROFILE_EMPLOYMENT_ROUTE}
            element={<ProfileEmployment />}
            permission={PROFILE_EMPLOYMENT_PERMISSION}
          />
          <PrivateRoute
            path={PROFILE_PASSWORD_ROUTE}
            element={<ProfilePassword />}
            permission={PROFILE_PASSWORD_PERMISSION}
          />
        </PrivateRoute>
        <PrivateRoute
          path="projects"
          element={
            <Navigate
              to={`${PUBLIC_URL_ROUTE}/${COMMON_UNDER_CONSTRUCTION_ROUTE}`}
              replace
            />
          }
        />
        <PrivateRoute
          path={USER_MANAGEMENT_ROUTE}
          element={<UserManagement />}
          permission={USER_MANAGEMENT_PERMISSION}
        />
        <PrivateRoute
          path={COUNTRY_MANAGEMENT_ROUTE}
          element={<CountryManagement />}
          permission={COUNTRY_MANAGEMENT_PERMISSION}
        />

        <PrivateRoute
          path={ORGANIZATION_MANAGEMENT_ROUTE}
          element={<OrganizationManagement />}
          permission={ORGANIZATION_MANAGEMENT_PERMISSION}
        />
        <PrivateRoute
          path={ORGANIZATION_BRANCHES_ROUTE}
          element={<OrganizationBranches />}
          permission={ORGANIZATION_BRANCHES_PERMISSION}
        />
        <PrivateRoute
          path={QUESTION_MANAGEMENT_ROUTE}
          element={<QuestionManagement />}
          permission={QUESTION_MANAGEMENT_PERMISSION}
        />
        <PrivateRoute
          path={REPORT_ROUTE}
          element={<SampleReport />}
          permission={REPORT_PERMISSION}
        />
      </PrivateRoute>

      {/* Common routes */}
      <Route
        path={COMMON_UNDER_CONSTRUCTION_ROUTE}
        element={<UnderConstructions />}
      />
      <Route path={COMMON_403_ROUTE} element={<Forbidden />} />
      <Route path={COMMON_404_ROUTE} element={<NotFound />} />

      {/* Default route */}
      <Route
        path="*"
        element={
          <Navigate to={`${PUBLIC_URL_ROUTE}/${COMMON_404_ROUTE}`} replace />
        }
      />
    </Routes>
  )
}

export default AppRoutes
