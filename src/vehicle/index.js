export const search = ({location, number_of_months}) => fetch('https://app.joindrover.com/api/web/vehicles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    location,
    "max_distance": 50,
    number_of_months,
    "number_of_weeks": 52,
    "order_by": "price",
    "order_direction": "asc",
    "page": 1,
    "per_page": 15,
    "price_max": 2500,
    "price_min" :100,
    "rolling": false,
    "start_date": "09/05/2018",
    "vehicle_type": "consumer"
  })
}).then(res => res.json()).then(({data}) => data)

export const KEY_FACTS = {
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

export const FEATURES = {
  leather_seats: 'Leather Seats',
  bluetooth: 'Bluetooth Connectivity',
  aircon: 'Air Conditioning',
  alloy_wheels: 'Alloy Wheels',
  aux_input: 'Aux Input',
  upholstery_cloth: 'Upholstery Cloth',
  fmam_radio: 'FM/AM Radio',
  satnav: 'Satellite Navigation',
  cruise_control: 'Cruise Control',
  dab_radio: 'DAB Radio',
  parking_sensors: 'Parking Sensors'
}
