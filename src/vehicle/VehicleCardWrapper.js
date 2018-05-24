import styled from 'styled-components'

const VehicleCardWrapper = styled.div`
  border-radius: 6px;
  background-color: white;
  border: 1px solid #efefef;
  display: flex;
  overflow: hidden;

  .vehicle-slide-show {
    width: 35%;
    max-width: 340px;
    height: 158px;
  }

  .vehicle-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    & > :not(:last-child):not(.features) {
      border-bottom: 1px solid #efefef;
    }
  }

  .vehicle-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .key-facts {
    font-weight: bold;
    height: 57px;

    ul > li {
      width: 25%;

      img {
        width: 22px;
        height: 22px;
      }

      span {
        margin-left: 5px;
      }
    }
  }

  .features {
    color: #7d807c;
    height: 44px;
  }

  .key-facts > ul, .features {
    list-style: none;
    display: flex;
    flex-wrap: wrap;

    li {
      display: inline-block;
      font-size: 12px;
    }
  }

  .pricing {
    display: flex;
    background-color: #bef9f9;
    flex: 1;
    align-items: center;
    justify-content: flex-end;

    .value-wrapper {
      text-align: right;
      line-height: 1;

      .price {
        font-weight: bold;
        font-size: 18px;
      }
    }

    button {
      font-weight: bold;
      border-color: #5dcb7f;
      background-color: #50ff7d;
    }
  }
`

export default VehicleCardWrapper