import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: absolute;
  right: 0;
  width: 133px;
  background-color: #EB464A;
  color: #fff;
  line-height: 50px;
  font-size: 18px;
  text-align: center;
  top: 0;
`;

export default class RedButton extends Component {
  static propTypes = {
    name: PropTypes.string,
    addInCart: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root onClick={this.props.addInCart}>
        加入购物车
      </Root>
    );
  }
}
