import React, { Component } from 'react'
import Pagination from 'react-js-pagination'

import sortIcon from '../assets/icons/sort.svg'

import Location from '../common/components/Location'
import Dropdown from '../common/components/Dropdown'
import Radio from '../common/components/Radio'

import VehicleCard from './VehicleCard'
import PriceRange from './PriceRange'
import AggregationDropdown from './AggregationDropdown'
import SearchFormWrapper from './SearchFormWrapper'

import {search, VEHICLE_MAKES, SUB_TYPES} from './'

const
  SUBSCRIPTION_START_OPTIONS = {
    consumer: [2, 14, 30],
    PCO: [2, 7]
  },
  DISTANCE_OPTIONS = [25, 50, 75, 100, 150, 200]

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

const SORTING_OPTIONS = [{
  order_by: 'price',
  order_direction: 'asc',
  label: 'Price - Low To High'
}, {
  order_by: 'price',
  order_direction: 'desc',
  label: 'Price - High To Low'
}, {
  order_by: 'distance',
  order_direction: 'asc',
  label: 'Distance - Close To Far'
}]

const VEHICLE_TYPES = {
  consumer: 'Consumer',
  PCO: 'Private-Hire'
}

const DEFAULT_SEARCH_PARAMS = {
  location: 'London, United Kingdom',
  number_of_months: 12,
  number_of_weeks: 52,
  sortBy: SORTING_OPTIONS[0],
  price_min: 100,
  price_max: 2500,
  vehicle_type: 'consumer',
  subscription_start_days: SUBSCRIPTION_START_OPTIONS.consumer[2],
  max_distance: DISTANCE_OPTIONS[1]
}

class SearchForm extends Component {
  state = {
    searchParams: DEFAULT_SEARCH_PARAMS,
    loading: true
  }

  componentDidMount = () => this.search()

  search = () => {
    this.setState({
      loading: true
    }, async () => {
      //param names that don't match between API input and response
      const {body_information, sortBy, ...searchParams} = this.state.searchParams

      this.setState({
        loading: false,
        results: await search({
          ...searchParams,
          ...sortBy,
          body_type: body_information
        })
      }) 
    })    
  }

  updateSearchParams = update => this.setState({
    searchParams: {
      ...this.state.searchParams,
      ...update
    }
  }, this.search)

  setVehicleType = vehicle_type => {
    const subscriptionStartOptions = SUBSCRIPTION_START_OPTIONS[vehicle_type]

    this.setState({
      searchParams: {
        ...this.state.searchParams,
        subscription_start_days: subscriptionStartOptions[subscriptionStartOptions.length - 1],
        vehicle_type
      },
      //clean results since consumer type vehicles don't have PCO pricing information
      results: null
    }, this.search) 
  }

  render = () => {
    const {
      searchParams,
      loading,
      results
    } = this.state, {
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
        onChange={value => this.updateSearchParams({[key]: value})}
      />
    ))

    return (
      <SearchFormWrapper className="row">
        <div className="search-form col-12 col-lg-3">
          <div className="input-group-no-conflict">
            <label>Vehicle Type</label>
            <Dropdown
              options={Object.keys(VEHICLE_TYPES)}
              valueLabel={value => VEHICLE_TYPES[value]}
              optionLabel={value => VEHICLE_TYPES[value]}
              value={vehicle_type}
              onChange={this.setVehicleType}
            />
          </div>
          <div className="input-group-no-conflict">
            <label>Location</label>
            <Location onChange={location => this.updateSearchParams({location})} value={location}/>
          </div>
          <div className="input-group-no-conflict">
            <label>Subscription starts within the</label>
            <Dropdown
              options={SUBSCRIPTION_START_OPTIONS[vehicle_type]}
              valueLabel={value => `${value} Days`}
              optionLabel={value => `Next ${value} Days`}
              value={subscription_start_days}
              onChange={subscription_start_days => this.updateSearchParams({subscription_start_days})}
            />
          </div>
          <div className="input-group-no-conflict">
            <label>Distance (radius in miles)</label>
            <Dropdown
              options={DISTANCE_OPTIONS}
              value={max_distance}
              onChange={subscription_start_days => this.updateSearchParams({subscription_start_days})}
            />
          </div>
          <div className="input-group-no-conflict">
            <label>Monthly Budget</label>
            <PriceRange
              value={[price_min, price_max]}
              onChange={([price_min, price_max]) => this.updateSearchParams({price_min, price_max})}
            />
          </div>
          {!isConsumer && generateAggregationOptions(PCO_AGGREGATION_TYPES)}
          {generateAggregationOptions(AGGREGATION_TYPES)}
        </div>
        <div className="search-results col-12 col-lg-9">
          {results && <h3>{total_count} vehicles found near {location}</h3>}
          {results && (
            <div className="subscription-type">
              <div className="subscription-type-picker px-3 pt-2 pb-1">
                <div className="label my-1">Choose your subscription type:</div>
                <div className="subscription-type-option mb-2" onClick={() => this.updateSearchParams({rolling: true})}>
                  <Radio id="rolling-true" checked={!!rolling} readOnly/>
                  <label className="m-0 pl-2" htmlFor="rolling-true">Monthly Rolling Subscription (cancel or swap monthly)</label>
                </div>
                <div className="subscription-type-option" onClick={() => this.updateSearchParams({rolling: false})}>
                  <Radio id="rolling-false" checked={!rolling} readOnly/>
                  <label className="m-0 pl-2" htmlFor="rolling-false">Minimum Commitment Subscription (get discounts!)</label>
                </div>
              </div>
              {!rolling && (
                <div className="subcription-duration-picker pr-3 pl-3 pb-2">
                  Subscription duration
                  <Dropdown
                    className="mx-2"
                    value={number_of_months}
                    options={Array(11).fill().map((_, i) => i+2)}
                    onChange={number_of_months => this.updateSearchParams({number_of_months})}
                  />
                  months
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
                onChange={sortBy => this.updateSearchParams({sortBy})}
              />
            </div>
          )}
          {loading?'Loading':(
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
                onChange={page => this.updateSearchParams({page})}
                itemClassPrev="prev"
                itemClassNext="next"
              />
            </div>
          )}
        </div>
      </SearchFormWrapper>
    )
  }
}

export default SearchForm
