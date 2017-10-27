/**
 * 普通商品
 */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import GoodItem from '../Goods/Main/GoodItem';
import CountInput from 'containers/CountInput';

const CountContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;


export default class Item extends Component {
  static propTypes = {
    id: PropTypes.string,
    cartId: PropTypes.string,
    type: PropTypes.string,
    picUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    unit: PropTypes.string,
    price: PropTypes.string,
    count: PropTypes.number,
    countChange: PropTypes.func,
    isEdit: PropTypes.bool,
    delChecked: PropTypes.bool,
    checked: PropTypes.bool,
    checkChange: PropTypes.func,
    priceVisible: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  countChange = (value) => {
    const {id, cartId, type, countChange } = this.props;
    countChange(value, id, cartId, type, countChange);
  }

  render() {
    const {id, cartId, picUrl, title, subtitle, unit, price, count, isEdit, checked, delChecked, checkChange, priceVisible } = this.props;
    const checkedStatus = isEdit ? delChecked : checked;
    return (
      <div>
        <GoodItem checkChange={checkChange} id={id} cartId={cartId} checked={checkedStatus} img={picUrl} title={title} subtitle={subtitle} price={priceVisible ? price : null} left={0}>
          <CountContainer>
            <CountInput size={'small'} count={count} unit={unit} countChange={this.countChange}/>
          </CountContainer>
        </GoodItem>
      </div>
    );
  }
}
