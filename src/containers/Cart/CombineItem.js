import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import GoodItem from '../Goods/Main/GoodItem';
import Price from 'components/Price';
import CountInput from 'containers/CountInput';

const Root = styled.div`
  position: relative;
  border-bottom: 1px solid #f0f1f2;
`;

const Info = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 12px;
  color: #999999;
`;

const PriceContainer = styled.div`
  margin-left: 140px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const CountContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const NumberInfo = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 15px;
  color: #000000;
`;

export default class CombineItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    cartId: PropTypes.string,
    type: PropTypes.string,
    checked: PropTypes.bool,
    delChecked: PropTypes.bool,
    isEdit: PropTypes.bool,
    checkChange: PropTypes.func,
    items: PropTypes.array,
    price: PropTypes.string,
    count: PropTypes.number,
    countChange: PropTypes.func,
    unit: PropTypes.string,
    noCount: PropTypes.bool,
    numberInfo: PropTypes.string,
    priceVisible: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  countChange = (value) => {
    const { id, cartId, type, countChange } = this.props;
    countChange(value, id, cartId, type);
  }

  render() {
    const {cartId, checkChange, checked, delChecked, isEdit, items, count, price, unit, noCount, numberInfo, priceVisible } = this.props;
    let checkedStatus = isEdit ? delChecked : checked;
    let HasCheck = ({picUrl, title, subtitle, info, id}) => (
      <GoodItem id={id} cartId={cartId} checkChange={checkChange} checked={checkedStatus} img={picUrl} title={title} subtitle={subtitle}>
        <Info>
          {info}
        </Info>
      </GoodItem>
    );

    let NoCheck = ({picUrl, title, subtitle, info, id}) => (
      <GoodItem padding id={id} img={picUrl} title={title} subtitle={subtitle}>
        <Info>
          {info}
        </Info>
      </GoodItem>
    );

    // 如果没有选择数字框
    if (noCount) {
      checkedStatus = undefined;
      HasCheck = NoCheck = ({picUrl, title, subtitle, info, id}) => (
        <GoodItem id={id} cartId={cartId} checkChange={checkChange} checked={checkedStatus} img={picUrl} title={title} subtitle={subtitle}>
          <Info>
            {info}
          </Info>
        </GoodItem>
      );
    }

    const Count = props => (
      <CountContainer>
        <CountInput {...props} size={'small'} />
      </CountContainer>
    );
    return (
      <Root>
        {items && items.map((props, index) => index === 0 ? <HasCheck key={index} {...props}/> : <NoCheck key={index} {...props}/>)}
        <PriceContainer>
          {priceVisible ? <Price price={price}/> : null}
          {noCount ? <NumberInfo>{numberInfo}</NumberInfo> : <Count small count={count} unit={unit} countChange={this.countChange}/> }
        </PriceContainer>
      </Root>
    );
  }
}
