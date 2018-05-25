import styled from 'styled-components'

const DropdownOptions = styled.ul`
  width: 100%;
  position: absolute;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.19);
  border-radius: 6px;
  list-style: none;
  z-index: 1;

  li {
    background: #ffffff;
    padding: 10px;
    width: 100%;

    &:first-child {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    &:last-child {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #efefef;
    }

    &:hover {
      background-color: #f5f5f5;
    }

    &:active {
      background-color: #f9e5be;
    }
  }
`

export default DropdownOptions