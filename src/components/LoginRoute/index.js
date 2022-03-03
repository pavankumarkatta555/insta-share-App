import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErr: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const apiResponse = await fetch(loginApiUrl, options)
    const responseData = await apiResponse.json()

    if (apiResponse.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', responseData.jwt_token, {expires: 30})

      history.replace('/')
    } else {
      this.setState({showErr: true, errorMsg: responseData.error_msg})
    }
  }

  render() {
    const {showErr, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-responsive-container">
          <div className="login-lg-image-container">
            <img
              src="https://res.cloudinary.com/dvzwomefi/image/upload/v1644815547/Layer_2_e27cky.jpg"
              alt="login large img"
              className="login-lg-image"
            />
          </div>
          <div className="login-card-container">
            <img
              src="https://res.cloudinary.com/dvzwomefi/image/upload/v1644811740/Standard_Collection_8_tca3mi.jpg"
              alt="insta share icon"
              className="login-insta-icon"
            />
            <h1 className="login-heading">Insta Share</h1>
            <form className="login-form-container" onSubmit={this.onSubmitForm}>
              <div className="login-form-inner-containers">
                <label htmlFor="username" className="login-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="login-input"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="login-form-inner-containers">
                <label htmlFor="password" className="login-label">
                  password
                </label>
                <input
                  type="text"
                  id="password"
                  className="login-input"
                  onChange={this.onChangePassword}
                />
              </div>
              {showErr && <p className="error-msg">{errorMsg}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute
