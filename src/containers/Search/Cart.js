import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import cartpng from 'components/icons/cart.png';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getCartCount } from 'redux/modules/cart';

const Root = styled.div`
  background: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
  width: 45px;
  height: 45px;
  position: fixed;
  left: 18px;
  bottom: 18px;
  z-index: 1;
  border-radius: 100%;
  padding: 12px 10px 8px;
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 25px;
  height: auto;
`;

const Badge = styled.div`
  position: absolute;
  right: -5px;
  top: -2px;
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
        <Icon src={cartpng}/>
        {cartCount > 0 && <Badge>{cartCount < 100 ? cartCount : '99+' }</Badge>}
      </Root>
    );
  }
}
