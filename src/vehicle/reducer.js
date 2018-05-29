import {CLEAR_RESULTS, FETCH_VEHICLES_START, FETCH_VEHICLES_SUCCESS, UPDATE_SEARCH_PARAMS} from './actions'

import {DEFAULT_SEARCH_PARAMS} from './'

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
			searchParams: DEFAULT_SEARCH_PARAMS
		}
	}	
}