import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {IoWarning} from 'react-icons/io5'

import Cookies from 'js-cookie'

import Header from '../Header'
import Profile from '../ProfilesRenderingRoute'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class userProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userData: {},
  }

  componentDidMount() {
    this.fetchingUserDetails()
  }

  onClickTryAgainBtn = () => {
    this.fetchingUserDetails()
  }

  fetchingUserDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {userId} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, options)

    if (apiResponse.ok) {
      const jsonResponseData = await apiResponse.json()

      const updatedJsonData = {
        id: jsonResponseData.user_details.id,
        userId: jsonResponseData.user_details.user_id,
        userName: jsonResponseData.user_details.user_name,
        userProfilePic: jsonResponseData.user_details.profile_pic,
        postsCount: jsonResponseData.user_details.posts_count,
        followers: jsonResponseData.user_details.followers_count,
        following: jsonResponseData.user_details.following_count,
        userBio: jsonResponseData.user_details.user_bio,
        stories: jsonResponseData.user_details.stories,
        posts: jsonResponseData.user_details.posts,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        userData: updatedJsonData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  apiStatusOnSuccess = () => {
    const {userData} = this.state

    return (
      <div className="profile-success-container">
        <Profile key={userData.id} profileData={userData} />
      </div>
    )
  }

  apiStatusFailure = () => (
    <div className="failure-view-container">
      <IoWarning fontSize="32" color="#4094EF" />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="failure-view-button"
        onClick={this.onClickTryAgainBtn}
      >
        Try again
      </button>
    </div>
  )

  apiStatusInProgress = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#007BFF" height="40" width="40" />
    </div>
  )

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.apiStatusInProgress()
      case apiStatusConstants.failure:
        return this.apiStatusFailure()
      case apiStatusConstants.success:
        return this.apiStatusOnSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-details-main-container">
        <Header />
        {this.renderBasedOnApiStatus()}
      </div>
    )
  }
}

export default userProfile
