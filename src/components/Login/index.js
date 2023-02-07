import {Component} from 'react'

class Login extends Component {
  state = {userName: '', pin: ''}

  render() {
    const {userName, pin} = this.state
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <div>
            <h1>Welcome Back!</h1>
            <form>
              <label>
                User ID
                <input type="text" value={userName} />
              </label>
              <label>
                PIN
                <input type="password" value={pin} />
              </label>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
