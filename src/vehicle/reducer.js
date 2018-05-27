import {CLEAR_RESULTS, FETCH_VEHICLES_START, FETCH_VEHICLES_SUCCESS, UPDATE_SEARCH_PARAMS} from './actions'

import {SORTING_OPTIONS, SUBSCRIPTION_START_OPTIONS, DISTANCE_OPTIONS} from './'

export default (state, action) => {
	switch(action.type) {
		case CLEAR_RESULTS: return {
			...state,
			results: null
		};
		case FETCH_VEHICLES_START: return {
			...state,
			loading: true
		};
		case FETCH_VEHICLES_SUCCESS: return {
			...state,
			loading: false,
			results: action.results
		};
		case UPDATE_SEARCH_PARAMS: return {
			...state,
			searchParams: {
				...state.searchParams,
				...action.update
			}
		}
		default: return {
			searchParams: {
				location: 'London, United Kingdom',
				number_of_months: 12,
				number_of_weeks: 52,
				sortBy: SORTING_OPTIONS[0],
				price_min: 100,
				price_max: 2500,
				vehicle_type: 'consumer',
				subscription_start_days: SUBSCRIPTION_START_OPTIONS.consumer[2],
				max_distance: DISTANCE_OPTIONS[1]
			}
		}
	}	
}