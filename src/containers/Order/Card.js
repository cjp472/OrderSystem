import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import GoodItem from 'containers/Goods/Main/GoodItem';
import Attributes from './Attributes';
import ImgScroll from './ImgScroll';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const Root = styled.div`
  box-shadow: 1px 1px 0 0 #E5E5E5, -1px -1px 0 0 #E5E5E5;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 2px;
  background: #fff;
`;

const Title = styled.div`
  height: 44px;
  box-shadow: 0 1px 0 0 #E5E5E5;
  padding-left: 12px;
  height: 44px;
  color: #1A1A1A;
  font-size: 14px;
  line-height: 46px;
`;

const Status = styled.div`
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  background: ${props => props.color};
  border-radius: 2px;
  font-size: 12px;
  color: #FFFFFF;
  height: 19px;
  width: 45px;
  line-height: 1.5;
  text-align: center;
`;

@connect(null, {
  pushState: push
})

export default class Card extends Component {
  static propTypes = {
    item: PropTypes.object,
    pushState: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  goDetail = (item) => {
    this.props.pushState(`/_react_/order/detail/${item.type}/${item.orderId}/${item.tenantId}/${item.customerId}/${item.supplierId}`);
    return;
  }

  render() {
    const { item } = this.props;
    let Item = null;
    if (item.picLength === 0) {
      Item = null;
    } else if (item.picLength === 1) {
      Item = (<GoodItem
        noHref
        color={'#FAFAFA'}
        img={item.detail.picUrl}
        title={item.detail.title}
        subtitle={item.detail.subtitle}
        left={0}
      />);
    } else {
      Item = <ImgScroll imgs={item.detail} />;
    }
    return (
      item &&
      <Root onClick={() => this.goDetail(item)}>
        <Title>{item.title}<Status color={item.color}>{item.statusName}</Status> </Title>
        {Item}
        <Attributes noborder right items={item.items} />
      </Root>
    );
  }
}
