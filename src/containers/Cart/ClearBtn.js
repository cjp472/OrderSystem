import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 60px;
`;

const Btn = styled.div`
  display: inline-block;
  background: #FFFFFF;
  border: 1px solid #999;
  border-radius: 3px;
  font-size: 14px;
  color: #666666;
  height: 33px;
  width: 150px;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;
`;

export default class ClearBtn extends Component {
  static propTypes = {
    name: PropTypes.string,
    clearExpiryGoods: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root>
        <Btn onClick={this.props.clearExpiryGoods}>清空失效商品</Btn>
      </Root>
    );
  }
}
