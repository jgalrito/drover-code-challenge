import React, {Component} from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

import DropdownOptions from './DropdownOptions'

import {getPredictions, reverseGeocode} from '../../utils/location'
import closeIcon from '../../assets/icons/close.svg'

const LocationWrapper = styled.div`
  position: relative;

  img {
    position: absolute;
    top: 50%;
    right: 11px;
    transform: translateY(-50%);
    width: 27px;
    padding-left: 10px;
    padding-right: 2px;
    background-color: white;
  }
`

class LocationBase extends Component {
  state = {
    value: this.props.value,
    dropdownOptions: []
  }

  getPredictions = value => this.setState({
    value,
  }, async () => {
    if(value && value.length)
      this.setState({
        dropdownOptions: (await getPredictions({
          input: value
        })).map(({description}) => description)
      })
  }) 

  setLocation = value => {
    this.setState({
      value,
      showDropdown: false
    })

    this.props.onChange(value)
  }

  toggleDropdown = force => this.setState({
    showDropdown: typeof force === 'undefined'?!this.state.showDropdown:force
  })

  useCurrentLocation = () => navigator.geolocation.getCurrentPosition(({coords}) => reverseGeocode({
    lat: coords.latitude,
    lng: coords.longitude
  }).then(([{formatted_address}]) => this.setLocation(formatted_address)))

  handleClickOutside = () => this.toggleDropdown(false)

  render = () => {
    const {value, showDropdown, dropdownOptions} = this.state

    return (
      <LocationWrapper className="location">
        <input placeholder="Enter your location" type="text" value={value} onChange={({target}) => this.getPredictions(target.value)} onClick={() => this.toggleDropdown()}/>
        {value && value.length && <img alt="Close" src={closeIcon} onClick={() => this.getPredictions('')}/>}
        {showDropdown && (
          <DropdownOptions>
            <li onClick={this.useCurrentLocation}>Use current location</li>
            {dropdownOptions.map((value, i) => <li key={i} onClick={() => this.setLocation(value)}>{value}</li>)}
          </DropdownOptions>
        )}
      </LocationWrapper>
    )
  }  
}

const Location = onClickOutside(LocationBase)

export default Location