import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import GoodItem from '../Goods/Main/GoodItem';
import Mark from './Mark';

const Root = styled.div`
  position: relative;
  border-bottom: 1px solid #f0f1f2;
  display: flex;
`;

const Info = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 12px;
  color: #999999;
`;

const Items = styled.div`
  flex: 1;
`;

export default class CombineExpiryItem extends Component {
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
        <Mark/>
        <Items>
          {items && items.map(({picUrl, title, subtitle, info, id}, index) => (
            <GoodItem key={index} id={id} img={picUrl} title={title} subtitle={subtitle}>
              <Info>
                {info}
              </Info>
            </GoodItem>
          ))}
        </Items>
      </Root>
    );
  }
}
