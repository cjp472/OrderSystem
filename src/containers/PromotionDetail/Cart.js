import React, {PropTypes} from 'react';
import styled from 'styled-components';
import cartpng from 'components/icons/cart.png';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getCartCount } from 'redux/modules/cart';

const Root = styled.div`
  position: relative;
  width: 40px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 25px;
  height: auto;
`;

const Text = styled.div`
  font-size: 10px;
  color: #666;
`;

const Badge = styled.div`
  position: absolute;
  right: -3px;
  top: 0;
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
export default class Cart extends React.Component {
  static propTypes = {
    cartCount: PropTypes.number,
    getCartCount: PropTypes.func,
    pushState: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCartCount();
  }

  render() {
    const { cartCount, pushState } = this.props;
    return (
      <Root onClick={() => pushState('/_react_/cart')}>
        <Icon src={cartpng} />
        <Text>购物车</Text>
        {cartCount > 0 && <Badge>{cartCount < 100 ? cartCount : '99+' }</Badge>}
      </Root>
    );
  }
}
