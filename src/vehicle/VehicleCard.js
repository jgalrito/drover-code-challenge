import React from 'react'
import moment from 'moment'

import {capitalize} from '../utils/string'

import VehicleCardWrapper from './VehicleCardWrapper'
import VehicleSlideShow from './VehicleSlideShow'

import {VEHICLE_MAKES} from './'

const KEY_FACTS = {
  year: {
    icon: require('./assets/year.svg')
  },
  body_information: {
    icon: require('./assets/body_type.svg')
  },
  transmission: {
    icon: require('./assets/transmission.svg')
  },
  fuel: {
    icon: require('./assets/fuel_type.svg')
  },
  number_seats_information: {
    icon: require('./assets/seats.svg'),
    label: seats => `${seats} Seats`
  },
  number_doors_information: {
    icon: require('./assets/doors.svg'),
    label: doors => `${doors} Doors`
  },
  color: {
    icon: require('./assets/color.svg')
  }
}

const FEATURES = {
  air_conditioning: "Air Conditioning",
  aircon: "Air Conditioning",
  alloy_wheels: "Alloy Wheels",
  aux_input: "Aux Input",
  bluetooth: "Bluetooth Connectivity",
  convertible: "Convertible",
  cruise_control: "Cruise Control",
  dab_radio: "DAB Radio",
  electric_sliding_doors: "Electric Sliding Doors",
  electric_windows: "Electric Windows",
  fmam_radio: "FM/AM Radio",
  heated_seats: "Heated Seats",
  leather_seats: "Leather Seats",
  parking_sensors: "Parking Sensors",
  satellite_navigation: "Satellite Navigation",
  satnav: "Satellite Navigation",
  start_stop: "Auto Start-Stop",
  tinted_windows: "Tinted Windows",
  upholstery_cloth: "Upholstery Cloth"
}

const VehicleCard = ({vehicle, subscriptionDuration}) => {
  const {
    images,
    vehicle_make,
    vehicle_model,
    engine_size_information,
    postcode,
    available_start_date,
    features,
    price_discount_and_deposit_schedule_hash
  } = vehicle

 return (
    <VehicleCardWrapper className="vehicle-card">
      <VehicleSlideShow images={images}/>
      <div className="vehicle-info">
        <div className="vehicle-title pl-3">
          <div className="pb-1 pt-2">
            <h3 className="vehicle-make-brand m-0">{capitalize(`${VEHICLE_MAKES[vehicle_make.toLowerCase()] || vehicle_make} ${vehicle_model} ${engine_size_information}L`)}</h3>
            <span className="vehicle-location">Located in {postcode.split(' ')[0]}</span>
          </div>
          <div className="availability pr-3">
            Available from {moment(available_start_date).format('Do MMMM YYYY')}
          </div>
        </div>
        <div className="key-facts py-1 px-2">
          <ul>
            {Object.entries(KEY_FACTS).map(([key, {icon, label}]) => {
              label = capitalize((label?label(vehicle[key]):vehicle[key]).toString())

              return (
                <li key={key} className="px-1 pb-1">
                  <img src={icon} alt={label}/>
                  <span>{label}</span>
                </li>
              ) 
            })}
          </ul>
        </div>
        <ul className="features py-1 px-2">
          {features.reduce((items, feature, i) => {
            items.push(FEATURES[feature])

            if(i < features.length - 1)
              items.push('•');

            return items;
          }, []).map((content, i) => <li key={i} className="pl-1 pr-1">{content}</li>)}
        </ul>
        <div className="pricing px-2 pb-2 pt-0 p-lg-2 p-xl-2 px-xl-3">
          <div className="value-wrapper mr-lg-3 p-2 p-lg-0 mb-2 mb-lg-0">
            <div className="value">
              <span className="price">£ {price_discount_and_deposit_schedule_hash[subscriptionDuration].driver_price_pounds_after_discount_including_insurance}</span>/month
            </div>
            <small className="periodicity">
              (Monthly Vehicle Price inc. VAT)
            </small>
          </div>
          <button>See more details</button>
        </div>
      </div>
    </VehicleCardWrapper>
  )
}

export default VehicleCard