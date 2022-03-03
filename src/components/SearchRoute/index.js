import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Post from '../PostDetailsRoute'

import './index.css'

class SearchResults extends Component {
  state = {
    searchResults: [],
  }

  componentDidMount() {
    this.fetchingSearchedItems()
  }

  fetchingSearchedItems = async () => {
    const {match} = this.props
    const {params} = match
    const {searchText} = params

    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchText}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, options)

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

      this.setState({searchResults: updatedResponseData})
    }
  }

  renderSearchResults = () => {
    const {searchResults} = this.state

    return (
      <ul className="search-results-container">
        {searchResults.map(eachPost => (
          <Post key={eachPost.postId} postDetails={eachPost} />
        ))}
      </ul>
    )
  }

  renderNotFound = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dvzwomefi/image/upload/v1646326043/Group_tabxh2.jpg"
        alt="error png"
      />
      <h1>Search Not Found</h1>
      <p>Try different keyword or search again</p>
    </div>
  )

  render() {
    const {searchResults} = this.state

    return (
      <div className="search-results-main-container">
        <Header />
        {searchResults.length !== 0
          ? this.renderSearchResults()
          : this.renderNotFound()}
      </div>
    )
  }
}

export default SearchResults
