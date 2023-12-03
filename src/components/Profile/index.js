import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {userProfileDetails: [], isShowRetry: false}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const Token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateData = {
        name: data.profile_details.name,
        imageUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }

      this.setState({userProfileDetails: updateData, isShowRetry: false})
    } else {
      this.reload()
    }
  }

  reload = () => {
    this.setState({isShowRetry: true})
  }

  renderProfileView = () => {
    const {userProfileDetails} = this.state
    const {name, imageUrl, bio} = userProfileDetails
    return (
      <div className="profile-container">
        <img src={imageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{bio}</p>
      </div>
    )
  }

  renderRetryView = () => (
    <div className="retry-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {isShowRetry} = this.state
    return (
      <>
        {!isShowRetry && <div>{this.renderProfileView()}</div>}
        {isShowRetry && <div>{this.renderRetryView()}</div>}
      </>
    )
  }
}
export default Profile
