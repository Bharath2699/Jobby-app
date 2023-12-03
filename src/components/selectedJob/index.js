import {AiFillStar} from 'react-icons/ai'
import {FaLocationArrow} from 'react-icons/fa'
import {BiCalendarCheck} from 'react-icons/bi'
import {FiNavigation} from 'react-icons/fi'
import './index.css'

const selectedJob = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    skills,
    lifeAtCompany,
  } = jobDetails

  const {description, desImageUrl} = lifeAtCompany

  return (
    <div className="selected-job-item">
      <div className="first-layer">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
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
        <div className="navigation-link">
          <h1 className="description-heading">Description</h1>
          <a href={companyWebsiteUrl}>
            <div className="nav-link">
              <p className="company">Visit</p>
              <FiNavigation fill=" #b6c5ff" size="45" />
            </div>
          </a>
        </div>
        <p className="job-description">{jobDescription}</p>
      </div>

      <div className="skills-container">
        <h1 className="skills-heading">Skills</h1>
        <ul className="skill-unorder-list">
          {skills.map(each => (
            <li className="skill-card">
              <img
                src={each.imageUrl}
                alt={each.name}
                className="skill-image"
              />
              <p className="skill-name">{each.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="life-style-container">
        <h1 className="life-heading">Life at Company</h1>
        <div className="life-contents">
          <p className="life-description">{description}</p>
          <img src={desImageUrl} alt="life at company" className="life-image" />
        </div>
      </div>
    </div>
  )
}
export default selectedJob
