import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import '../utils/math.js';

const Price = styled.div`
  color: #EB464A;
  font-size: 12px;
  vertical-align: bottom;
`;

const Big = styled.span`
  font-size: 16px;
`;

export default class Index extends Component {
  static propTypes = {
    price: PropTypes.string,
    precision: PropTypes.number,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {price, precision} = this.props;
    let newPrice = price;
    if (precision) {
      try {
        newPrice = String(Number(price).toFixed(precision));
      } catch (error) {
        console.log(error);
      }
    }
    // const priceString = String(newPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    const priceString = Math.Calc.toThousandth(newPrice);
    let priceInt = null;
    let priceTail = null;
    if (priceString.indexOf('.') !== -1) {
      priceInt = priceString.substring(0, priceString.indexOf('.'));
      priceTail = '.' + priceString.substring(priceString.indexOf('.') + 1);
    } else {
      priceInt = priceString;
    }
    return (
      <Price>¥<Big>{priceInt}</Big>{priceTail}</Price>
    );
  }
}
