import {AiFillStar} from 'react-icons/ai'
import {FaLocationArrow} from 'react-icons/fa'
import {BiCalendarCheck} from 'react-icons/bi'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-job-container">
      <div className="first-layer">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-image"
        />
        <div className="title-rating-card">
          <h1 className="job-title">{title}</h1>
          <div className="rating-star">
            <AiFillStar fill=" #fbbf24" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="third-layer">
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </div>
      <div className="second-layer">
        <div className="location-type">
          <div className="location-card">
            <FaLocationArrow fill="#ffffff" />
            <p className="location">{location}</p>
          </div>
          <div className="type-card">
            <BiCalendarCheck fill="#ffffff" />
            <p className="type">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
