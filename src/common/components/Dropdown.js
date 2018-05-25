import React, {Component} from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

import DropdownOptions from './DropdownOptions'

import caretDownIcon from '../../assets/icons/caret_down.svg'

const DropdownWrapper = styled.div`
	cursor: pointer;

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

		img {
			transform: rotate(-90deg);
			width: 20px;
			cursor: pointer;
		}
	}
`

class DropdownBase extends Component {
	state = {
		value: this.props.value
	}

	setValue = value => {
		this.setState({
			value,
			showDropdown: false
		})

		this.props.onChange(value)
	}

	handleClickOutside = () => this.toggleDropdown(false)

	toggleDropdown = force => this.setState({
		showDropdown: typeof force === 'undefined'?!this.state.showDropdown:force
	})

	render = () => {
		const {value, showDropdown} = this.state

		return (
			<DropdownWrapper className="dropdown">
				<div className="dropdown-value" onClick={() => this.toggleDropdown()}>
					<span>{this.props.valueLabel?this.props.valueLabel(value):value}</span>
					<img alt="Click to toggle" src={caretDownIcon}/>
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