export const search = ({
  body_information,
  fuel,
  location,
  max_distance,
  number_of_months,
  page,
  price_min,
  price_max,
  subscription_start_days,
  tags,
  transmission,
  vehicle_make,
  year
}) => fetch('https://app.joindrover.com/api/web/vehicles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    body_type: body_information,
    fuel,
    location,
    max_distance,
    number_of_months,
    "number_of_weeks": 52,
    "order_by": "price",
    "order_direction": "asc",
    page,
    "per_page": 15,
    price_min,
    price_max,
    "rolling": false,
    "start_date": "09/05/2018",
    "vehicle_type": "consumer",
    subscription_start_days,
    tags: tags && [tags],
    transmission,
    vehicle_make,
    year: parseInt(year) || undefined
  })
}).then(res => res.json())

export const VEHICLE_MAKES = {
    bmw: 'BMW',
    byd: 'BYD',
    mini: 'MINI'
}