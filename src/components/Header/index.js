import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FiSearch} from 'react-icons/fi'
import {IoIosClose} from 'react-icons/io'
import './index.css'

class Header extends Component {
  state = {
    optionsIcon: false,
    searchText: '',
  }

  onchangeInput = event => {
    this.setState({searchText: event.target.value})
  }

  onClickOptionsIcon = () => {
    this.setState({optionsIcon: true})
  }

  onClickCloseBtn = () => {
    this.setState({optionsIcon: false})
  }

  onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props

    history.replace('/login')
  }

  displayOptions = () => {
    const {history} = this.props
    const {pathname} = history.location

    const homeActive = pathname === '/' ? 'active-btns' : ''
    const profileActive = pathname === '/profile' ? 'active-btns' : ''

    return (
      <div className="sm-options-responsive-container">
        <ul className="sm-options-unordered-list-container">
          <li>
            <Link to="/" className="sm-options-link">
              <button
                type="button"
                className={`sm-options-button ${homeActive}`}
              >
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <button type="button" className="sm-options-button">
                Search
              </button>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="sm-options-link">
              <button
                type="button"
                className={`sm-options-button ${profileActive}`}
              >
                Profile
              </button>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="sm-logout-button"
              onClick={this.onClickLogoutBtn}
            >
              Logout
            </button>
          </li>
        </ul>
        <div>
          <button
            type="button"
            className="close-icon-btn"
            onClick={this.onClickCloseBtn}
          >
            <IoIosClose fontSize="30" color="#ffffff" fontWeight="500" />
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {optionsIcon, searchText} = this.state

    const searchLinks = searchText !== '' ? `/search/${searchText}` : '/'

    const {history} = this.props
    const {pathname} = history.location

    const homeActive = pathname === '/' ? 'active-btns' : ''
    const profileActive = pathname === '/profile' ? 'active-btns' : ''

    return (
      <>
        <nav className="nav-bg-container">
          <div className="nav-responsive-container">
            <div className="nav-app-icon-heading-container">
              <Link to="/" className="nav-heading-link-element">
                <img
                  src="https://res.cloudinary.com/dvzwomefi/image/upload/v1644811740/Standard_Collection_8_tca3mi.jpg"
                  alt="nav app icon"
                  className="nav-app-image"
                />
                <h1 className="nav-app-heading">Insta Share</h1>
              </Link>
            </div>
            <div className="devices-dividing-container">
              <ul className="nav-lg-list-container">
                <li className="nav-lg-search-list-item">
                  <input
                    type="search"
                    placeholder="Search Caption"
                    className="nav-lg-search-element"
                    onChange={this.onchangeInput}
                    value={searchText}
                  />
                  <Link to={searchLinks} className="search-icon-btn-element">
                    <button type="button" className="search-icon-btn-element">
                      <FiSearch />
                    </button>
                  </Link>
                </li>
                <li className="home-profile-list-items">
                  <Link to="/">
                    <button
                      type="button"
                      className={`home-profile-buttons ${homeActive}`}
                    >
                      Home
                    </button>
                  </Link>
                </li>
                <li className="home-profile-list-items">
                  <Link to="/profile">
                    <button
                      type="button"
                      className={`home-profile-buttons ${profileActive}`}
                    >
                      Profile
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="nav-logout-button"
                    onClick={this.onClickLogoutBtn}
                  >
                    Logout
                  </button>
                </li>
              </ul>
              <button
                type="button"
                className="menu-icon-btn"
                onClick={this.onClickOptionsIcon}
              >
                <img
                  src="https://res.cloudinary.com/dvzwomefi/image/upload/v1645974309/menu_dwty4j.svg"
                  alt="options svg"
                  className="options-image"
                />
              </button>
            </div>
          </div>
        </nav>
        <div className="sm-display-options-container">
          {optionsIcon && this.displayOptions()}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
