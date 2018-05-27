import {search, SUBSCRIPTION_START_OPTIONS} from './'

export const
  CLEAR_RESULTS = 'CLEAR_RESULTS',
  FETCH_VEHICLES_START = 'FETCH_VEHICLES_START',
  FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS',
  UPDATE_SEARCH_PARAMS = 'UPDATE_SEARCH_PARAMS'

const clearResults = () => ({type: CLEAR_RESULTS})

export const fetchVehicles = () => async (dispatch, getState) => {
  dispatch({type: FETCH_VEHICLES_START})

  //param names that don't match between API input and response
  const {body_information, sortBy, ...searchParams} = getState().vehicle.searchParams

  dispatch({
    type: FETCH_VEHICLES_SUCCESS,
    results: await search({
      ...searchParams,
      ...sortBy,
      body_type: body_information
    })
  })
}

export const setVehicleType = vehicle_type => dispatch => {
  const subscriptionStartOptions = SUBSCRIPTION_START_OPTIONS[vehicle_type]

  //clean results since consumer type vehicles don't have PCO pricing information
  dispatch(clearResults())

  dispatch(updateSearchParams({
    subscription_start_days: subscriptionStartOptions[subscriptionStartOptions.length - 1],
    vehicle_type
  }))
}

export const updateSearchParams = update => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_SEARCH_PARAMS,
    update
  })

  dispatch(fetchVehicles())
}