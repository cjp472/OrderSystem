import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Attributes from '../Order/Attributes';

const Root = styled.div`
  margin-top: 10px;
`;

const BtnContainer = styled.div`
  margin-top: 1px;
  background: #FFFFFF;
  height: 44px;
  box-shadow: 0px 1px 0 0 #E5E5E5;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Btn = styled.div`
  float: right;
  margin-top: 9px;
  margin-right: 12px;
  padding: 2px 6px;
  border: 1px solid #EB464A;
  border-radius: 3px;
  font-size: 13px;
  color: #EB464A;
`;

export default class Order extends Component {
  static propTypes = {
    items: PropTypes.array,
    isDelivered: PropTypes.bool,
    isBuyAgain: PropTypes.bool,
    signConfirm: PropTypes.func,
    buyAgain: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { items, isDelivered, isBuyAgain, signConfirm, buyAgain } = this.props;
    return (
      <Root>
        <Attributes items={items}/>
        <BtnContainer show={isDelivered || isBuyAgain}>
          { isDelivered && <Btn onClick={signConfirm}>确认签收</Btn> }
          { isBuyAgain && <Btn onClick={buyAgain}>再次购买</Btn> }
        </BtnContainer>
      </Root>
    );
  }
}
