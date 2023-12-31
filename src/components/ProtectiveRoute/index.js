import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectiveRoute = props => {
  const Token = Cookies.get('jwt_token')
  if (Token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default ProtectiveRoute
