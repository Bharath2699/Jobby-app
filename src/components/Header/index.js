import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onRedirectToLogin = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo-image"
        />
      </Link>
      <ul className="list-contents">
        <li className="home-item">
          <Link to="/">Home</Link>
        </li>
        <li className="jobs-item">
          <Link to="/jobs">Jobs</Link>
        </li>
      </ul>

      <li className="logout">
        <button
          type="button"
          onClick={onRedirectToLogin}
          className="logout-button"
        >
          Logout
        </button>
      </li>
    </div>
  )
}
export default withRouter(Header)
