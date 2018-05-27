export const search = ({
  city_jurisdiction,
  body_type,
  fuel,
  location,
  max_distance,
  number_of_months,
  number_of_weeks,
  order_by,
  order_direction,
  page,
  price_min,
  price_max,
  rolling,
  vehicle_type,
  sub_type,
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
    city_jurisdiction,
    body_type,
    fuel,
    location,
    max_distance,
    number_of_months,
    number_of_weeks,
    order_by,
    order_direction,
    page,
    per_page: 15,
    price_min,
    price_max,
    rolling,
    vehicle_type,
    sub_type,
    subscription_start_days,
    tags: tags && [tags],
    transmission,
    vehicle_make,
    year: parseInt(year, 10) || undefined
  })
}).then(res => res.json())

export const VEHICLE_MAKES = {
  bmw: 'BMW',
  byd: 'BYD',
  mini: 'MINI'
}

export const SUB_TYPES = {
  uber_exec: 'Uber Exec',
  uber_lux: 'Uber Lux',
  uberx: 'Uber X',
  uberxl: 'Uber XL'
}