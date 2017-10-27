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

export default class CombineGoods extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root>
        <GoodItem
          img={'https://img.alicdn.com/bao/uploaded/i1/2653351646/TB1fyVISVXXXXabaXXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg'}
          title={'复合肽营养饮品礼盒装II型复合肽营养饮品礼盒装II型复合肽营'}
          subtitle={'1kg/袋 [绿，原味]'}
          isPromotion
          price={199}
          left={0}
        >
          <Icon>x1 箱</Icon>
        </GoodItem>
        <GoodItem
          img={'https://img.alicdn.com/bao/uploaded/i1/2653351646/TB1fyVISVXXXXabaXXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg'}
          title={'复合肽营养饮品礼盒装II型复合肽营养饮品礼盒装II型复合肽营'}
          subtitle={'1kg/袋 [绿，原味]'}
          isPromotion
          price={199}
          left={0}
        >
          <Icon>x1 箱</Icon>
        </GoodItem>
      </Root>
    );
  }
}
