import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SelectedJob from '../selectedJob'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'

import './index.css'

const apiStatusOption = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    selectedJobsList: [],
    similarJobList: [],
    apiStatus: apiStatusOption.initial,
  }

  componentDidMount() {
    this.getSelectedJobDetails()
  }

  getSelectedJobDetails = async () => {
    this.setState({apiStatus: apiStatusOption.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const Token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedSelectedList = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          desImageUrl: data.job_details.life_at_company.image_url,
        },
      }

      const updatedSimilarJobList = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        apiStatus: apiStatusOption.success,
        selectedJobsList: updatedSelectedList,
        similarJobList: updatedSimilarJobList,
      })
    } else {
      this.setState({apiStatus: apiStatusOption.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {selectedJobsList, similarJobList} = this.state
    return (
      <div>
        <SelectedJob jobDetails={selectedJobsList} />
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="unorder-list">
          {similarJobList.map(each => (
            <SimilarJobItem similarJobDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.getSelectedJobDetails}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderFinalJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOption.success:
        return this.renderSuccessView()
      case apiStatusOption.failure:
        return this.renderFailureView()
      case apiStatusOption.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobItem-container">{this.renderFinalJobsView()}</div>
      </>
    )
  }
}
export default JobItemDetails
