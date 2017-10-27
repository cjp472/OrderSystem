/**
 * 普通商品
 */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import GoodItem from '../Goods/Main/GoodItem';

const Number = styled.div`
  position: absolute;
  color: #999999;
  right: 12px;
  bottom: 12px;
  font-size: 12px;
`;


export default class Item extends Component {
  static propTypes = {
    id: PropTypes.string,
    picUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    price: PropTypes.string,
    count: PropTypes.number,
    unit: PropTypes.string,
    priceVisible: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {id, picUrl, title, subtitle, price, count, unit, priceVisible} = this.props;
    return (
      <div>
        <GoodItem id={id} img={picUrl} title={title} subtitle={subtitle} price={priceVisible ? price : null} left={0}>
          <Number>{`x${count}${unit}`}</Number>
        </GoodItem>
      </div>
    );
  }
}
