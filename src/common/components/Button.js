import styled from 'styled-components'

const Button = styled.button`
	height: 40px;
	border-radius: 6px;
	border: none;
	font-size: 14px;
	cursor: pointer;
	padding: 5px 15px;
    transition: background-color .5s;
    border-color: #5dcb7f;
	background-color: #50ff7d;
	font-weight: bold;

	&:hover {
		background-color: #3cb962;        
	}
`

export default Button