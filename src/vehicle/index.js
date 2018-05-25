export const search = ({location, max_distance, number_of_months, price_min, price_max, subscription_start_days}) => fetch('https://app.joindrover.com/api/web/vehicles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    location,
    max_distance,
    number_of_months,
    "number_of_weeks": 52,
    "order_by": "price",
    "order_direction": "asc",
    "page": 1,
    "per_page": 15,
    price_min,
    price_max,
    "rolling": false,
    "start_date": "09/05/2018",
    "vehicle_type": "consumer",
    subscription_start_days
  })
}).then(res => res.json())