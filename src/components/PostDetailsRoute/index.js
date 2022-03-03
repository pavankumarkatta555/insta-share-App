import {Link} from 'react-router-dom'

import {BiShareAlt} from 'react-icons/bi'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'

import './index.css'

const Post = props => {
  const {postDetails} = props
  const {
    postId,
    profilePic,
    userId,
    userName,
    postImageUrl,
    postLikes,
    postCaption,
    comments,
    postCreatedTime,
  } = postDetails

  return (
    <li key={postId} className="home-post-details-list-item">
      <div className="home-post-user-details-container">
        <div className="home-post-user-profile-pic-container">
          <img
            src={profilePic}
            alt="user profile pic"
            className="home-post-user-profile-pic"
          />
        </div>
        <Link to={`/insta-share/users/${userId}`} className="user-id-link">
          <p className="home-post-user-name">{userName}</p>
        </Link>
      </div>
      <img src={postImageUrl} alt="post url" className="home-post-image" />
      <div className="home-post-description-container">
        <div className="home-post-like-share-comment-btn-container">
          <button type="button" className="like-share-comment-button">
            <BsHeart fontSize="21" fontWeight="700" color="#475569" />
          </button>
          <button type="button" className="like-share-comment-button">
            <FaRegComment fontSize="23" color="#475569" />
          </button>
          <button type="button" className="like-share-comment-button">
            <BiShareAlt fontSize="24" color="#475569" />
          </button>
        </div>
        <p className="post-likes">{postLikes} likes</p>
        <p className="post-caption">{postCaption}</p>
        <ul className="comments-container">
          {comments.map(eachComment => (
            <li
              key={eachComment.user_id}
              className="username-comment-container"
            >
              <Link
                to={`/insta-share/users/${eachComment.user_id}`}
                className="user-id-link"
              >
                <p className="home-post-comment-username">
                  {eachComment.user_name}
                </p>
              </Link>

              <p className="home-post-comment">{eachComment.comment}</p>
            </li>
          ))}
        </ul>
        <p className="post-created-at">{postCreatedTime}</p>
      </div>
    </li>
  )
}

export default Post
