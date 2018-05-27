import React from 'react'
import styled from 'styled-components'

const RadioWrapper = styled.div`
	display: inline-block;
	position: relative;
	width: 25px;
	height: 25px;

	input {
		visibility: hidden;
		height: 0;
		width: 0;
		position: absolute;
	}

	.checkmark {
		width: 20px;
		height: 20px;
		border: 1px solid #e4e4e4;
		border-radius: 50%;
		background-color: white;
		position: relative;
	}

	input:checked + .checkmark {
		background-color: #172B24;

		&:after {
			content: '';
			position: absolute;
			background-color: #50ff7d;
			top: 1px;
			left: 1px;
			width: 16px;
			height: 16px;
			border-radius: 50%;
		}
	}
`

const Radio = props => (
	<RadioWrapper className="radio">
		<input type="radio" {...props}/>
		<div className="checkmark"></div>
	</RadioWrapper>
)

export default Radio