import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {IoWarning} from 'react-icons/io5'

import Cookies from 'js-cookie'

import Header from '../Header'
import ReactSlick from '../Stories'
import Post from '../PostDetailsRoute'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userPostsData: [],
  }

  componentDidMount() {
    this.fetchingUserPosts()
  }

  onClickTryAgainBtn = () => {
    this.fetchingUserPosts()
  }

  fetchingUserPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const userPostUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const apiResponse = await fetch(userPostUrl, options)

    if (apiResponse.ok) {
      const jsonResponseData = await apiResponse.json()

      const updatedResponseData = jsonResponseData.posts.map(eachPost => ({
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        postImageUrl: eachPost.post_details.image_url,
        postLikes: eachPost.likes_count,
        postCaption: eachPost.post_details.caption,
        comments: eachPost.comments,
        postCreatedTime: eachPost.created_at,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        userPostsData: updatedResponseData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  apiStatusOnSuccess = () => {
    const {userPostsData} = this.state

    return (
      <ul className="home-user-posts-list-container">
        {userPostsData.map(eachPost => (
          <Post key={eachPost.postId} postDetails={eachPost} />
        ))}
      </ul>
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
      <div className="home-main-container">
        <Header />
        <ReactSlick />
        <hr className="home-hr-line" />
        {this.renderBasedOnApiStatus()}
      </div>
    )
  }
}

export default Home
