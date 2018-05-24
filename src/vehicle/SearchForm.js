import React, { Component } from 'react'
import styled from 'styled-components'

import {search} from './'

import VehicleCard from './VehicleCard'

const
  DEFAULT_LOCATION = 'London, Uk',
  DEFAULT_SUBSCRIPTION_DURATION_YEARS = 12

const SearchFormWrapper = styled.div`
  .result-list {
    list-style: none;
    
    & > :not(:last-child) {
      margin-bottom: 15px;
    }
  }
`

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchParams: {
        location: DEFAULT_LOCATION,
        number_of_months: DEFAULT_SUBSCRIPTION_DURATION_YEARS
      },
      loading: true
    }
  }

  componentDidMount() {
    this.search()    
  }

  search() {
    this.setState({
      loading: true
    }, async () => this.setState({
      loading: false,
      results: await search(this.state.searchParams)
    }))    
  }

  setLocation(location) {
    this.setState({
      searchParams: {
        location
      }
    }, this.search)
  }

  render() {
    const {
      searchParams,
      loading,
      results
    } = this.state, {
      location,
      number_of_months
    } = searchParams

    return (
      <SearchFormWrapper className="row">
        <div className="search-form col-12 col-lg-3">
          <div>
            <label>Location</label>
            <input type="text" defaultValue={location}/>
          </div>
        </div>
        <div className="search-results col-12 col-lg-9">
          {loading?'Loading':(
            <ul className="result-list">
              {results.map(vehicle => <li key={vehicle.id}><VehicleCard vehicle={vehicle} subscriptionDuration={number_of_months}/></li>)}
            </ul>
          )}
        </div>
      </SearchFormWrapper>
    )
  }
}

export default SearchForm
