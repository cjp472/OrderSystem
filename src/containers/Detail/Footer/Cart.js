import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import icon from './cart.png';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getCartCount } from 'redux/modules/cart';

const Root = styled.div`
  display: inline-block;
  text-align: center;
  font-size: 10px;
  color: #666;
  padding-top: 0px;
  position: relative;
`;

const Img = styled.img`
  width: 25px;
  height: auto;
`;

const Badge = styled.div`
  position: absolute;
  right: -3px;
  top: -5px;
  background: #FF0000;
  font-size: 10px;
  color: #FFFFFF;
  line-height: 18px;
  text-align: center;
  height: 18px;
  width: 18px;
  border-radius: 100%;
`;

@connect(state => ({
  cartCount: state.cart.cartCount,
}), {
  getCartCount,
  pushState: push
})
export default class Cart extends Component {
  static propTypes = {
    cartCount: PropTypes.number,
    getCartCount: PropTypes.func,
    pushState: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.getCartCount();
  }

  render() {
    const { cartCount, pushState } = this.props;
    return (
      <Root onClick={() => pushState('/_react_/cart')}>
        <Img src={icon}/>
        <br/>
        购物车
        {cartCount > 0 && <Badge>{cartCount < 100 ? cartCount : '99+' }</Badge>}
      </Root>
    );
  }
}
