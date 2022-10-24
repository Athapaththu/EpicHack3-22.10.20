import { Navigate, Route, RouteProps } from 'react-router'

import {
  COMMON_403_ROUTE,
  PUBLIC_LOGIN_ROUTE,
} from '../../base/constants/routes'
import { useAuth } from '../../modules/auth/contexts/AuthProvider'

type PrivateRouteProps = {
  roles?: string[]
  permission?: string
} & RouteProps

const PrivateRoute = ({
  roles,
  permission,
  ...routeProps
}: PrivateRouteProps): JSX.Element => {
  const { hasRole, userInfo } = useAuth()

  if (userInfo) {
    if (!hasRole(roles) || !permission) {
      return <Navigate to={`/${COMMON_403_ROUTE}`} />
    }
    return <Route {...routeProps} />
  } else {
    return <Navigate to={`/${PUBLIC_LOGIN_ROUTE}`} />
  }
}

export default PrivateRoute
