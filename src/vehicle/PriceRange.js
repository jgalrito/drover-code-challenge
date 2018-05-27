import React, {Component} from 'react'
import {Range} from 'rc-slider'
import styled from 'styled-components'

import 'rc-slider/assets/index.css'

const PriceRangeWrapper = styled.div`
	.range-container {
		padding: 0 6px;

		.rc-slider-track, .rc-slider-handle {
			border: 2px solid #172B24;
    		background-color: #50ff7d;
		}
	}
`

class PriceRange extends Component {
	state = {
		value: this.props.value
	}

	onChange = value => this.setState({value})

	render = () => {
		const
			{value} = this.state,
			[min, max] = value

		return (
		  <PriceRangeWrapper className="price-range">
		  	<p>£{min} - £{max}</p>
		  	<div className="range-container">
		    	<Range min={100} max={2500} step={10} value={value} onChange={this.onChange} onAfterChange={() => this.props.onChange(value)}/>
		    </div>
		  </PriceRangeWrapper>
		)	
	}
}

export default PriceRange