import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import FilterGroup from '../FilterGroup'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PART TIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationList = [
  {locationId: '1', label: 'Chennai'},

  {
    locationId: '2',
    label: 'Bangalore',
  },
  {
    locationId: '3',
    label: 'Hyderabad',
  },
  {
    locationId: '4',
    label: 'Delhi',
  },
  {
    locationId: '5',
    label: 'Mumbai',
  },
]

const apiStatusOption = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const employmentIds = []

class Jobs extends Component {
  state = {
    jobsList: [],

    searchInput: '',
    employmentType: '',
    salaryRange: '',
    apiStatus: apiStatusOption.initial,
  }

  componentDidMount() {
    this.getJobList()
  }

  getJobList = async () => {
    const {searchInput, employmentType, salaryRange} = this.state
    this.setState({apiStatus: apiStatusOption.inProgress})
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const Token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        id: each.id,
        title: each.title,
      }))
      this.setState({apiStatus: apiStatusOption.success, jobsList: updatedData})
    } else {
      this.setState({apiStatus: apiStatusOption.failure})
    }
  }

  selectedEmploymentType = employmentTypeId => {
    employmentIds.unshift(employmentTypeId)
    const employmentTypes = employmentIds.join(',')
    this.setState({employmentType: employmentTypes}, this.getJobList)
  }

  selectedSalaryRange = salaryRangeId => {
    this.setState({salaryRange: salaryRangeId}, this.getJobList)
  }

  selectedLocation = location => {
    const {jobsList} = this.state

    const filteredList = jobsList.filter(each => each.location === location)
    this.setState({jobsList: filteredList})
  }

  renderSuccessView = () => {
    const {jobsList} = this.state

    let jobs
    if (jobsList.length > 0) {
      jobs = true
    } else {
      jobs = false
    }

    return (
      <div className="jobs-lists-container">
        {jobs && (
          <ul>
            {jobsList.map(each => (
              <JobItem jobDetails={each} key={each.id} />
            ))}
          </ul>
        )}

        {!jobs && this.renderNoJobsView()}
      </div>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We Could not find any jobs.Try other filters
      </p>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className=""
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-button" onClick={this.getJobList}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onSearchJobs = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterValue = event => {
    if (event.key === 'Enter') {
      this.getJobList()
    }
  }

  onClickSearch = () => {
    this.getJobList()
  }

  renderSearchInputView = () => {
    const {searchInput} = this.state
    return (
      <div className="search-card">
        <input
          type="search"
          className="search-container"
          value={searchInput}
          placeholder="Search Jobs"
          onChange={this.onSearchJobs}
          onKeyDown={this.onEnterValue}
        />
        <button
          type="button"
          className="search-button"
          data-testid="searchButton"
          onClick={this.onClickSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderFinalView = () => {
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
        <div className="jobs-container">
          <div className="first-part">
            <Profile />
            <hr className="list" />
            <FilterGroup
              selectedEmploymentType={this.selectedEmploymentType}
              selectedSalaryRange={this.selectedSalaryRange}
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              locationList={locationList}
              selectedLocation={this.selectedLocation}
            />
          </div>

          <div className="second-part">
            <div className="search">{this.renderSearchInputView()} </div>
            {this.renderFinalView()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
