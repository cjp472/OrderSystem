import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import GoodItem from 'containers/Goods/Main/GoodItem';

const Root = styled.div`
  margin-top: 10px;
  background-color: #FFF;
`;

const Icon = styled.div`
  color: #999999;
  font-size: 12px;
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

export default class Gifts extends Component {
  static propTypes = {
    gifts: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { gifts } = this.props;
    return (
      <Root>
        {gifts && gifts.map((gift, index) => {
          return (<GoodItem
            noHref
            key={index}
            id={gift.id}
            img={gift.picUrl}
            title={gift.title}
            subtitle={gift.subtitle}
            isGift
            left={0}
          >
            <Icon>{gift.info}</Icon>
          </GoodItem>);
        })}
      </Root>
    );
  }
}
