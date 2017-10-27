import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import PriceCmp from 'components/Price';

const Root = styled.div`
  background: #fff;
  box-shadow: 0 1px 0 0 #E5E5E5;
`;

const Item = styled.div`
  padding: 10px 12px;
  height: 45px;
  box-shadow: 0 0 0 0 #EEEEEE, inset 0 1px 0 0 #E5E5E5;
  box-sizing: border-box;
`;

const Title = styled.span`
  font-size: 16px;
  color: #999;
`;

const Right = styled.span`
  float: right;
  font-size: 16;
`;

export default class Attribute extends Component {
  static propTypes = {
    items: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {items} = this.props;
    return (
      <Root>
        {items.map(({title, price, value}, index) => (
          (value || value === 0 || price) && <Item key={index}>
            <Title>{title}</Title>
            <Right>
              {price ? <PriceCmp price={price}/> : <span>{value}</span>}
            </Right>
          </Item>
        ))}
      </Root>
    );
  }
}
