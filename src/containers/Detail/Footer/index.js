import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import RedButton from './RedButton';
import Cart from './Cart';

const Root = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  left: 0;
  right: 0;
  background: #FFFFFF;
  height: 50px;
  box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.08);
  padding: 6px 15px;
  box-sizing: border-box;
`;

export default class Footer extends Component {
  static propTypes = {
    name: PropTypes.string,
    addInCart: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root>
        <Cart />
        <RedButton addInCart={this.props.addInCart}>加入购物车</RedButton>
      </Root>
    );
  }
}
