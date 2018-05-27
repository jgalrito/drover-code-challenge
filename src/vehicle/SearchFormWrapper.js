import styled from 'styled-components'

const SearchFormWrapper = styled.div`
  @media (max-width: 991px) {
    padding-bottom: 70px;
  }

  &.refine-search {
    .back-to-results {
      display: flex;
    }

    .search-form {
      display: block;
    }

    .search-results {
      display: none;
    }
  }

  .back-to-results {
    display: none;
    color: white;
    background-color: #172B24;
    cursor: pointer;
    align-items: center;
  }

  .search-form {
    display: none;

    @media (min-width: 992px) {
      display: block;
    }

    .input-group-no-conflict > * {
      display: block;
    }
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

  .search-results {
    @media (min-width: 992px) {
      display: block !important;
    }

    & > h3 {
      text-transform: uppercase;
    }
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

  .loading {
    padding: 20px 0;

    svg {
      display: block;
      margin: auto;
    } 
  }

  .loading + .result-list {
    opacity: .5;
    pointer-events: none;
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

  .refine-search {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #172B24;
    text-align: center;
    z-index: 2;

    @media (min-width: 992px) {
      display: none;
    }
  }
`

export default SearchFormWrapper