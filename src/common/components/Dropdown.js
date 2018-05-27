import React, {Component} from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

import DropdownOptions from './DropdownOptions'

import CaretIcon from '../../common/components/CaretIcon'

const DropdownWrapper = styled.div`
	cursor: pointer;
	display: inline-block;

	.dropdown-value {
		display: flex;
		justify-content: space-between;
		border: solid 1px #e4e3e3;
	    border-radius: 6px;
	    width: 100%;
	    height: 40px;
	    padding: 10px;
	    background-color: white;
	    align-items: center;

		svg {
			transform: rotate(-90deg);
			width: 20px;
			cursor: pointer;
			margin-left: 10px;
		}
	}
`

class DropdownBase extends Component {
	state = {
		value: this.props.value
	}

	setValue = value => this.setState({
		value,
		showDropdown: false
	}, () => this.props.onChange(value))

	handleClickOutside = () => this.toggleDropdown(false)

	toggleDropdown = force => this.setState({
		showDropdown: typeof force === 'undefined'?!this.state.showDropdown:force
	})

	componentWillReceiveProps = ({value}) => value !== this.state.value && this.setState({value})

	render = () => {
		const
			{value, showDropdown} = this.state,
			{className} = this.props

		return (
			<DropdownWrapper className={`dropdown ${className || ''}`}>
				<div className="dropdown-value" onClick={() => this.toggleDropdown()}>
					<span>{this.props.valueLabel?this.props.valueLabel(value):value}</span>
					<CaretIcon/>
				</div>
				{showDropdown && (
					<DropdownOptions>
						{this.props.options.map((value, i) => <li key={i} onClick={() => this.setValue(value)}>{this.props.optionLabel?this.props.optionLabel(value):value}</li>)}
					</DropdownOptions>
				)}
			</DropdownWrapper>
		)
	}
}

const Dropdown = onClickOutside(DropdownBase)

export default Dropdown