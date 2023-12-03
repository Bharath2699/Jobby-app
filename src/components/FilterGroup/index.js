import './index.css'

const FilterGroup = props => {
  const renderEmploymentTypeFilter = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(each => {
      const {selectedEmploymentType} = props
      const onSelectEmploymentType = () =>
        selectedEmploymentType(each.employmentTypeId)

      return (
        <li>
          <input
            type="checkbox"
            className="check-box"
            key={each.employmentTypeId}
            onChange={onSelectEmploymentType}
            id={each.employmentTypeId}
          />
          <label className="type-of-employment" htmlFor={each.employmentTypeId}>
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(each => {
      const {selectedSalaryRange} = props
      const onSelectSalaryRange = () => selectedSalaryRange(each.salaryRangeId)

      return (
        <li>
          <input
            type="radio"
            className="radio-button"
            onChange={onSelectSalaryRange}
            key={each.salaryRangeId}
            value={each.label}
            id={each.salaryRangeId}
            name="salary"
          />

          <label className="salary" htmlFor={each.salaryRangeId}>
            {each.label}
          </label>
        </li>
      )
    })
  }
  const selectLocationFilter = () => {
    const {locationList} = props
    return locationList.map(each => {
      const {selectedLocation} = props
      const onSelectedLocation = () => selectedLocation(each.label)
      return (
        <li>
          <input
            type="checkbox"
            className="check-box"
            onChange={onSelectedLocation}
            key={each.locationId}
            id={each.locationId}
          />
          <label className="type-of-employment" htmlFor={each.locationId}>
            {each.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filters-container">
      <>
        <div className="employmentType-card">
          <h1 className="employment-heading">Type of Employment</h1>
          <ul className="list">{renderEmploymentTypeFilter()}</ul>
        </div>
      </>
      <hr className="line" />
      <>
        <div className="salary-range-filter">
          <h1 className="salary-heading">Salary Range</h1>
          <ul className="list">{renderSalaryRangeList()} </ul>
        </div>
      </>
      <hr className="line" />
      <>
        <div className="employmentType-card">
          <h1 className="employment-heading">Select Location</h1>
          <ul className="list">{selectLocationFilter()}</ul>
        </div>
      </>
    </div>
  )
}
export default FilterGroup
