import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderSuccessMsg = Token => {
    const {history} = this.props
    Cookies.set('jwt_token', Token, {expires: 30})
    history.replace('/')
  }

  renderFailureMsg = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSumbitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.renderSuccessMsg(data.jwt_token)
    } else {
      this.renderFailureMsg(data.error_msg)
    }
  }

  renderPasswordDetails = () => {
    const {password} = this.state

    return (
      <>
        <label className="password-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          className="password-card"
          placeholder="Password"
          onChange={this.onChangePassword}
          id="password"
        />
      </>
    )
  }

  renderUserNameDetails = () => {
    const {username} = this.state
    return (
      <>
        <label className="username-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          className="username-card"
          placeholder="Username"
          onChange={this.onChangeUserName}
          id="username"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const Token = Cookies.get('jwt_token')
    if (Token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSumbitForm}>
            <div className="username-container">
              {this.renderUserNameDetails()}
            </div>
            <div className="password-container">
              {this.renderPasswordDetails()}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
