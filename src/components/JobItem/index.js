import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {FaLocationArrow} from 'react-icons/fa'
import {BiCalendarCheck} from 'react-icons/bi'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    id,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobCard-item">
        <div className="first-layer">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="third-layer">
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItem
