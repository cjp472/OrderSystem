import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import BottomBar from './BottomBar';
import Price from 'components/Price';
import Check from './Check';

const Btn = styled.div`
  position: absolute;
  background: #EB464A;
  height: 50px;
  right: 0;
  top: 0;
  width: 120px;
  color: #fff;
  padding-top: 12px;
  text-align: center;
  box-sizing: border-box;
  font-size: 17px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
`;


export default class TotalBar extends Component {
  static propTypes = {
    label: PropTypes.string,
    price: PropTypes.string,
    checked: PropTypes.bool,
    checkAllChange: PropTypes.func,
    submitOrder: PropTypes.func,
    noCheck: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {label, price, checked, noCheck} = this.props;
    return (
      <BottomBar>
        {!noCheck && <Check checked={checked} checkChange={this.props.checkAllChange}/>}
        {(price || price === '0') && <PriceContainer><span>合计： </span><Price price={price} precision={2} /></PriceContainer>}
        <Btn onClick={this.props.submitOrder}>{label}</Btn>
      </BottomBar>
    );
  }
}
