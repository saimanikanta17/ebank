import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {userId: '', pin: '', showError: false, errorMsg: ''}

  changeUsername = event => {
    this.setState({userId: event.target.value})
  }

  changePin = event => {
    this.setState({pin: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitLoginDetails = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <div>
            <h1>Welcome Back!</h1>
            <form onSubmit={this.submitLoginDetails}>
              <label>
                User ID
                <input
                  type="text"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={this.changeUsername}
                />
              </label>
              <label>
                PIN
                <input
                  type="password"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={this.changePin}
                />
              </label>
              <button type="submit">Login</button>
              {showError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
