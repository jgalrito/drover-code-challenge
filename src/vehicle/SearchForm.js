import React, { Component } from 'react'
import styled from 'styled-components'
import Pagination from 'react-js-pagination'

import Location from '../common/components/Location'
import Dropdown from '../common/components/Dropdown'

import VehicleCard from './VehicleCard'
import PriceRange from './PriceRange'
import AggregationDropdown from './AggregationDropdown'

import {search, VEHICLE_MAKES} from './'

const
  SUBSCRIPTION_START_OPTIONS = [2, 14, 30],
  DISTANCE_OPTIONS = [25, 50, 75, 100, 150, 200]

const DEFAULT_SEARCH_PARAMS = {
  location: 'London, United Kingdom',
  number_of_months: 12,
  price_min: 100,
  price_max: 2500,
  subscription_start_days: SUBSCRIPTION_START_OPTIONS[2],
  max_distance: DISTANCE_OPTIONS[1]
}

const SearchFormWrapper = styled.div`
  .search-form .input-group-no-conflict > * {
    display: block;
  }

  .result-list {
    list-style: none;
    
    & > :not(:last-child) {
      margin-bottom: 15px;
    }
  }

  .pagination-wrapper {
    text-align: center;
    color: #172B24;

    .pagination {
      justify-content: center;

      li {
        &:not(:last-child) {
          margin-right: 10px;
        }

        &.prev, &.next {
          a {
            background-color: #bef9f9;
          }
        }

        &.active a {
          background-color: #50ff7d;
        }

        a {
          border: none;
          padding: 10px;
          text-align: center;
          border-radius: 6px;
          background: #ffffff;
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }
`

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

class SearchForm extends Component {
  state = {
    searchParams: DEFAULT_SEARCH_PARAMS,
    loading: true
  }

  componentDidMount = () => {
    this.search()    
  }

  search = () => {
    this.setState({
      loading: true
    }, async () => this.setState({
      loading: false,
      results: await search(this.state.searchParams)
    }))    
  }

  updateSearchParams = update => this.setState({
    searchParams: {
      ...this.state.searchParams,
      ...update
    }
  }, this.search)

  render = () => {
    const {
      searchParams,
      loading,
      results
    } = this.state, {
      location,
      number_of_months,
      price_min,
      price_max,
      subscription_start_days,
      max_distance
    } = searchParams, {
      aggregations,
      page,
      total_count,
      per_page
    } = (results && results.metadata || {}),
      totalPages = total_count && Math.floor(total_count / per_page)

    return (
      <SearchFormWrapper className="row">
        <div className="search-form col-12 col-lg-3">
          <div className="input-group-no-conflict">
            <label>Location</label>
            <Location onChange={location => this.updateSearchParams({location})} value={location}/>
          </div>
          <div className="input-group-no-conflict">
            <label>Subscription starts within the</label>
            <Dropdown
              options={SUBSCRIPTION_START_OPTIONS}
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
          {Object.entries(AGGREGATION_TYPES).map(([key, options]) => (
            <AggregationDropdown
              key={key}
              counts={aggregations && aggregations[key]}
              options={options}
              onChange={value => this.updateSearchParams({[key]: value})}
            />
          ))}
        </div>
        <div className="search-results col-12 col-lg-9">
          {loading?'Loading':(
            <ul className="result-list">
              {results && results.data.map(vehicle => <li key={vehicle.id}><VehicleCard vehicle={vehicle} subscriptionDuration={number_of_months}/></li>)}
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
