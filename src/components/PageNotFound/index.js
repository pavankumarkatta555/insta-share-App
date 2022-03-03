import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="page-not-found-bg-container">
    <div className="page-not-found-elements-container">
      <img
        src="https://res.cloudinary.com/dvzwomefi/image/upload/v1644852561/erroring_2_l7onjh.jpg"
        alt="page not found"
        className="page-not-found-image"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-description">
        we are sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="page-not-found-btn">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default PageNotFound
