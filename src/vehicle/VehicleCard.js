import React from 'react'
import moment from 'moment'

import {KEY_FACTS, FEATURES} from './'

import VehicleCardWrapper from './VehicleCardWrapper'
import VehicleSlideShow from './VehicleSlideShow'

const capitalizeWords = str => str.split(' ').map(str => str[0].toUpperCase() + str.slice(1)).join(' ')

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
        <div className="vehicle-title px-3">
          <div className="pb-1 pt-2">
            <h3 className="vehicle-make-brand m-0">{capitalizeWords(`${vehicle_make} ${vehicle_model} ${engine_size_information}L`)}</h3>
            <span className="vehicle-location">Located in {postcode.split(' ')[0]}</span>
          </div>
          <div className="availability">
            Available from {moment(available_start_date).format('Do MMMM YYYY')}
          </div>
        </div>
        <div className="key-facts py-1 px-2">
          <ul>
            {Object.entries(KEY_FACTS).map(([key, {icon, label}]) => (
              <li key={key} className="px-1 pb-1">
                <img src={icon}/>
                <span>{capitalizeWords((label?label(vehicle[key]):vehicle[key]).toString())}</span>
              </li>
            ))}
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