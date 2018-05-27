import styled from 'styled-components'

const VehicleCardWrapper = styled.div`
  border-radius: 6px;
  border: 1px solid #efefef;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: row;
  }

  .slide-show-container {
    height: 400px;
    width: 100%;
    position: relative;

    @media (min-width: 992px) {
      width: 35%;
      max-width: 340px;
      height: 158px;
    }

    & > img {
      position: absolute;
      top: 0;
      right: 0;
      width: 92px;
    }
  }

  .vehicle-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: white;

    & > :not(:last-child):not(.features) {
      border-bottom: 1px solid #efefef;
    }
  }

  .vehicle-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .availability {
    @media (max-width: 1200px) {
      width: 115px;
      text-align: center;
    }
  }

  .key-facts {
    font-weight: bold;
    height: 57px;
    overflow: hidden;

    ul > li {
      width: calc(100% / 3);

      @media (min-width: 992px) {
        width: 25%;        
      }

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

    @media (min-width) {
      height: 44px;      
    }
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
    flex: 1;

    @media (min-width: 992px) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      background-color: #bef9f9;
    }

    & > .discount-info {
      display: none;
      flex: 1;

      @media (min-width: 991px) {
        display: block;
      }
    }

    .max-price {
      color: #fe3030;
      text-decoration: line-through;
      font-size: 13px;
    }

    .value-wrapper {
      background-color: #bef9f9;
      border-radius: 6px;

      .max-price {
        @media (min-width: 992px) {
          display: none;
        }
      }

      .value {
        line-height: 1;
      }

      .price {
        font-weight: bold;
        font-size: 18px;
      }
    }

    button {
      width: 100%;

      @media (min-width: 992px) {
        width: auto;
      }

      @media (max-width: 1199px) {
        padding: 5px;
      }
    }
  }
`

export default VehicleCardWrapper