import {GrGrid} from 'react-icons/gr'
import './index.css'

const Profile = props => {
  const {profileData} = props

  return (
    <div className="profile-container">
      <div className="profile-details-container">
        <p className="profile-name">{profileData.userName}</p>
        <div className="profile-pic-posts-followers-container">
          <img
            src={profileData.userProfilePic}
            alt="profile pic"
            className="profile-picture"
          />
          <ul className="followers-following-list-container">
            <li className="count-description-list-item">
              <p className="count">{profileData.postsCount}</p>
              <p className="count-description">posts</p>
            </li>
            <li className="count-description-list-item">
              <p className="count">{profileData.followers}</p>
              <p className="count-description">followers</p>
            </li>
            <li className="count-description-list-item">
              <p className="count">{profileData.following}</p>
              <p className="count-description">following</p>
            </li>
          </ul>
        </div>
        <p className="profile-user-id">{profileData.userId}</p>
        <p className="profile-bio">{profileData.userBio}</p>
        <ul className="stories-unordered-list">
          {profileData.stories.map(eachStory => {
            const {id, image} = eachStory

            return (
              <li key={id} className="story-list-item">
                <img
                  src={image}
                  alt="story thumbnail"
                  className="story-thumbnail-image"
                />
              </li>
            )
          })}
        </ul>
      </div>
      <div className="laptop-profile-details-container">
        <div className="lg-profile-pic-container">
          <img
            src={profileData.userProfilePic}
            alt="profile pic"
            className="lg-profile-picture"
          />
        </div>
        <div>
          <p className="lg-user-name">{profileData.userName}</p>
          <ul className="lg-followers-following-list-container">
            <li className="lg-count-description-list-item">
              <p className="lg-count">{profileData.postsCount}</p>
              <p className="lg-count-description">posts</p>
            </li>
            <li className="lg-count-description-list-item">
              <p className="lg-count">{profileData.followers}</p>
              <p className="lg-count-description">followers</p>
            </li>
            <li className="lg-count-description-list-item">
              <p className="lg-count">{profileData.following}</p>
              <p className="lg-count-description">following</p>
            </li>
          </ul>
          <p className="lg-user-id">{profileData.userId}</p>
          <p className="lg-user-bio">{profileData.userBio}</p>
        </div>
      </div>
      <ul className="lg-stories-unordered-list">
        {profileData.stories.map(eachStory => {
          const {id, image} = eachStory

          return (
            <li key={id} className="lg-story-list-item">
              <img
                src={image}
                alt="story thumbnail"
                className="lg-story-thumbnail-image"
              />
            </li>
          )
        })}
      </ul>
      <hr className="hr-line" />
      <div className="posts-container">
        <div className="posts-icon-container">
          <GrGrid color="#262626" width="14" />
          <p className="posts-heading">Posts</p>
        </div>
        <ul className="posts-unordered-list">
          {profileData.posts.map(eachPost => {
            const {id, image} = eachPost

            return (
              <li key={id} className="post-list-item">
                <img src={image} alt="post thumbnail" className="post-image" />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Profile
