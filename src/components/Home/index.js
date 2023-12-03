import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onRedirectToJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fits your abilities and potential.
        </p>
        <button
          type="button"
          className="find-jobs-button"
          onClick={onRedirectToJobs}
        >
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default withRouter(Home)
