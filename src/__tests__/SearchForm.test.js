import '../testSetup'

import React from 'react'
import renderer from 'react-test-renderer'

import {SearchForm} from '../vehicle/SearchForm'
import {DEFAULT_SEARCH_PARAMS} from '../vehicle'

import results from './mockVehiclesResponse'

it('renders correctly', () => expect(renderer.create(
	<SearchForm
		loading={false}
		results={results}
		fetchVehicles={jest.fn()}
		searchParams={DEFAULT_SEARCH_PARAMS}
		setVehicleType={jest.fn()}
		updateSearchParams={jest.fn()}
	/>).toJSON()).toMatchSnapshot())