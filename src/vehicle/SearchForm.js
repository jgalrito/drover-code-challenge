import React, { Component } from 'react'
import Pagination from 'react-js-pagination'
import {connect} from 'react-redux'

import sortIcon from '../assets/icons/sort.svg'

import Location from '../common/components/Location'
import Dropdown from '../common/components/Dropdown'
import Radio from '../common/components/Radio'
import Button from '../common/components/Button'
import CaretIcon from '../common/components/CaretIcon'
import LoadingSpinnerIcon from '../common/components/LoadingSpinner'

import VehicleCard from './VehicleCard'
import PriceRange from './PriceRange'
import AggregationDropdown from './AggregationDropdown'
import SearchFormWrapper from './SearchFormWrapper'

import {updateSearchParams, setVehicleType, fetchVehicles} from './actions'
import {VEHICLE_MAKES, SUB_TYPES, SUBSCRIPTION_START_OPTIONS, SORTING_OPTIONS, DISTANCE_OPTIONS} from './'

const PCO_AGGREGATION_TYPES = {
  city_jurisdiction: 'City Jurisdiction',
  sub_type: {
    label: 'Uber Type',
    transformOptions: keys => keys.filter(key => key !== 'not_approved'),
    translations: SUB_TYPES
  },
}

const AGGREGATION_TYPES = {
  vehicle_make: {
    label: 'Vehicle Make',
    translations: VEHICLE_MAKES
  },
  transmission: 'Gearbox',
  year: {
    label: 'Year',
    transformOptions: years => years.reverse()
  },
  fuel: 'Fuel Type',
  tags: 'Car Type',
  body_information: 'Body Type'
}

const VEHICLE_TYPES = {
  consumer: 'Consumer',
  PCO: 'Private-Hire'
}

export class SearchForm extends Component {
  state = {
    refineSearch: false
  }

  componentDidMount = () => this.props.fetchVehicles()

  toggleRefineSearch = () => this.setState({
    refineSearch: !this.state.refineSearch
  })

  render = () => {
    const {
      refineSearch
    } = this.state, {
      loading,
      results,
      searchParams,
      updateSearchParams,
      setVehicleType
    } = this.props, {
      location,
      number_of_months,
      number_of_weeks,
      sortBy,
      price_min,
      price_max,
      vehicle_type,
      subscription_start_days,
      max_distance,
      rolling
    } = searchParams, {
      aggregations,
      page,
      total_count,
      per_page
    } = ((results && results.metadata) || {}),
      totalPages = total_count && Math.floor(total_count / per_page),
      isConsumer = vehicle_type === 'consumer'

    const generateAggregationOptions = aggregationOptions => Object.entries(aggregationOptions).map(([key, options]) => (
      <AggregationDropdown
        key={key}
        counts={aggregations && aggregations[key]}
        options={options}
        value={searchParams[key]}
        onChange={value => updateSearchParams({[key]: value})}
      />
    ))

    return (
      <SearchFormWrapper className={refineSearch?'refine-search':''}>
        <div className="back-to-results p-3" onClick={this.toggleRefineSearch}>
          <CaretIcon stroke="white"/>
          <span className="ml-2">Back to your search results</span>
        </div>
        <div className="container py-3">
          <div className="row">
            <div className="search-form col-12 col-lg-3">
              <div className="input-group-no-conflict">
                <label>Vehicle Type</label>
                <Dropdown
                  options={Object.keys(VEHICLE_TYPES)}
                  valueLabel={value => VEHICLE_TYPES[value]}
                  optionLabel={value => VEHICLE_TYPES[value]}
                  value={vehicle_type}
                  onChange={setVehicleType}
                />
              </div>
              <div className="input-group-no-conflict">
                <label>Location</label>
                <Location onChange={location => updateSearchParams({location})} value={location}/>
              </div>
              <div className="input-group-no-conflict">
                <label>Subscription starts within the</label>
                <Dropdown
                  options={SUBSCRIPTION_START_OPTIONS[vehicle_type]}
                  valueLabel={value => `${value} Days`}
                  optionLabel={value => `Next ${value} Days`}
                  value={subscription_start_days}
                  onChange={subscription_start_days => updateSearchParams({subscription_start_days})}
                />
              </div>
              <div className="input-group-no-conflict">
                <label>Distance (radius in miles)</label>
                <Dropdown
                  options={DISTANCE_OPTIONS}
                  value={max_distance}
                  onChange={subscription_start_days => updateSearchParams({subscription_start_days})}
                />
              </div>
              <div className="input-group-no-conflict">
                <label>Monthly Budget</label>
                <PriceRange
                  value={[price_min, price_max]}
                  onChange={([price_min, price_max]) => updateSearchParams({price_min, price_max})}
                />
              </div>
              {!isConsumer && generateAggregationOptions(PCO_AGGREGATION_TYPES)}
              {generateAggregationOptions(AGGREGATION_TYPES)}
            </div>
            <div className="search-results col-12 col-lg-9">
              {!loading && results && <h3>{total_count} vehicles found near {location}</h3>}
              {loading && <h3>Searching for vehicles near {location}</h3>}
              {results && (
                <div className="subscription-type">
                  <div className="subscription-type-picker px-3 pt-2 pb-1">
                    <div className="label my-1">Choose your subscription type:</div>
                    {isConsumer && (
                      <div className="consumer-subscription-options">
                        <div className="subscription-type-option mb-2" onClick={() => updateSearchParams({rolling: true})}>
                          <Radio id="rolling-true" checked={!!rolling} readOnly/>
                          <label className="m-0 pl-2" htmlFor="rolling-true">Monthly Rolling Subscription (cancel or swap monthly)</label>
                        </div>
                        <div className="subscription-type-option" onClick={() => updateSearchParams({rolling: false})}>
                          <Radio id="rolling-false" checked={!rolling} readOnly/>
                          <label className="m-0 pl-2" htmlFor="rolling-false">Minimum Commitment Subscription (get discounts!)</label>
                        </div>
                      </div>
                    )}
                    {!isConsumer && (
                      <div className="pco-subscription-options">
                        <div className="subscription-type-option mb-2" onClick={() => updateSearchParams({rolling: true})}>
                          <Radio id="rolling-true" checked={!!rolling} readOnly/>
                          <label className="m-0 pl-2" htmlFor="rolling-true">Weekly Rolling Subscription (cancel or swap weekly)</label>
                        </div>
                        <div className="subscription-type-option" onClick={() => updateSearchParams({rolling: false})}>
                          <Radio id="rolling-false" checked={!rolling} readOnly/>
                          <label className="m-0 pl-2" htmlFor="rolling-false">2 to 52 weeks (Subscribe for longer and save!)</label>
                        </div>
                      </div>
                    )}
                  </div>
                  {!rolling && (
                    <div className="subcription-duration-picker pr-3 pl-3 pb-2">
                      Subscription duration
                      {isConsumer && (
                        <div className="consumer-subscription-duration">
                          <Dropdown
                            className="mx-2"
                            value={number_of_months}
                            options={Array(11).fill().map((_, i) => i+2)}
                            onChange={number_of_months => updateSearchParams({number_of_months})}
                          />
                          months
                        </div>
                      )}
                      {!isConsumer && (
                        <div className="pco-subscription-duration">
                          <Dropdown
                            className="mx-2"
                            value={number_of_weeks}
                            options={Array(51).fill().map((_, i) => i+2)}
                            onChange={number_of_weeks => updateSearchParams({number_of_weeks})}
                          />
                          weeks
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {results && (
                <div className="sort py-2">
                  <div className="label pr-3 mr-3">
                    <img alt="sort" className={sortBy.order_direction} src={sortIcon}/>
                    <span className="pl-2">Sort</span>
                  </div>
                  <Dropdown
                    options={SORTING_OPTIONS}
                    value={sortBy}
                    valueLabel={({label}) => label}
                    optionLabel={({label}) => label}
                    onChange={sortBy => updateSearchParams({sortBy})}
                  />
                </div>
              )}
              {loading && (
                <div className="loading">
                  <LoadingSpinnerIcon/>
                </div>
              )}
              {results && (
                <ul className="result-list">
                  {results && results.data.map(({price_discount_and_deposit_schedule_hash, ...vehicle}) => {
                    const {
                      subtotal_price_pounds,
                      discount_pounds,
                      driver_price_pounds_after_discount_including_insurance
                    } = price_discount_and_deposit_schedule_hash[isConsumer?number_of_months:number_of_weeks]

                    return (
                      <li key={vehicle.id}>
                        <VehicleCard
                          vehicle={vehicle}
                          isConsumer={isConsumer}
                          totalPrice={Math.ceil(isConsumer?subtotal_price_pounds:driver_price_pounds_after_discount_including_insurance)}
                          discount={discount_pounds}
                        />
                      </li>)
                  })}
                </ul>
              )}
              {results && totalPages && totalPages > 1 && (
                <div className="pagination-wrapper">
                  <p className="number-results">Showing {(page - 1) * per_page + 1}-{page * per_page} of {total_count} results</p>
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={per_page}
                    totalItemsCount={total_count}
                    pageRangeDisplayed={4}
                    onChange={page => updateSearchParams({page})}
                    itemClassPrev="prev"
                    itemClassNext="next"
                  />
                </div>
              )}
            </div>
            <div className="refine-search p-3">
              <Button onClick={this.toggleRefineSearch}>{refineSearch?'Update search and hide filter':'Refine your search'}</Button>
            </div>
          </div>
        </div>
      </SearchFormWrapper>
    )
  }
}

const SearchFormContainer = connect(({vehicle}) => vehicle, {
  updateSearchParams,
  setVehicleType,
  fetchVehicles
})(SearchForm)

export default SearchFormContainer
