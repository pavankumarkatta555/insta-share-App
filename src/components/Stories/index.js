import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    storiesData: [],
  }

  componentDidMount() {
    this.fetchingStoriesData()
  }

  fetchingStoriesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, options)

    if (apiResponse.ok) {
      const responseJsonData = await apiResponse.json()
      const updatedJsonData = responseJsonData.users_stories.map(eachStory => ({
        userId: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        storiesData: updatedJsonData,
      })
    }
  }

  apiStatusOnSuccess = () => {
    const {storiesData} = this.state

    return (
      <div className="react-slick-main-container">
        <Slider {...settings}>
          {storiesData.map(each => {
            const {userId, storyUrl} = each

            return (
              <div className="slick-item" key={userId}>
                <img src={storyUrl} alt="story url" className="slick-logo" />
                <p className="story-user-name">Name</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  apiStatusInProgress = () => (
    <div className="slick-loader-container">
      <Loader type="TailSpin" color="#007BFF" height="30" width="30" />
    </div>
  )

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.apiStatusInProgress()
      case apiStatusConstants.success:
        return this.apiStatusOnSuccess()
      default:
        return null
    }
  }

  render() {
    return <div className="main-container">{this.renderBasedOnApiStatus()}</div>
  }
}

export default ReactSlick
