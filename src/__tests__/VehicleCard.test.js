import '../testSetup'

import React from 'react'
import renderer from 'react-test-renderer'

import {VehicleCard} from '../vehicle/VehicleCard'

import results from './mockVehiclesResponse'

it('renders correctly', () => expect(renderer.create(
	<VehicleCard
		vehicle={results.data[0]}
		isConsumer={true}
		totalPrice={50}
		discount={20}
	/>).toJSON()).toMatchSnapshot())