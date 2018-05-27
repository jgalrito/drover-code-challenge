import styled from 'styled-components'

const SearchFormWrapper = styled.div`
  .search-form .input-group-no-conflict > * {
    display: block;
  }

  .sort {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .label {
      font-weight: bold;
      display: flex;
      align-items: center;
      border-right: 1px solid #e4e3e3;

      img {
        height: 25px;

        &.asc {
          transform: scale(1, -1);
        }
      }
    }

    .dropdown {
      .dropdown-value {
        height: 30px;
        padding: 0;
        border: none;
        background-color: transparent;
      }
    }
  }

  .search-results > h3 {
    text-transform: uppercase;
  }

  .subscription-type {
    border-radius: 6px;
    background: #ffffff;
    border: 1px solid #e4e4e4;

    .subscription-type-picker {
      .label {
        font-weight: bold;
      }

      .subscription-type-option {
        display: flex;
        align-items: center;

        label {
          font-weight: normal;
          font-size: 14px;
        }
      }
    }

    .subcription-duration-picker {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .dropdown ul {
        max-height: 301px;
      }
    }
  }

  .result-list {
    list-style: none;
    
    & > :not(:last-child) {
      margin-bottom: 15px;
    }
  }

  .pagination-wrapper {
    text-align: center;
    color: #172B24;

    .pagination {
      justify-content: center;

      li {
        &:not(:last-child) {
          margin-right: 10px;
        }

        &.prev, &.next {
          a {
            background-color: #bef9f9;
          }
        }

        &.active a {
          background-color: #50ff7d;
        }

        a {
          border: none;
          padding: 10px;
          text-align: center;
          border-radius: 6px;
          background: #ffffff;
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }
`

export default SearchFormWrapper