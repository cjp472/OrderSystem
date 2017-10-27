import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import arrow from 'components/icons/arrow.png';
import DateSel from './DateSel';

const Root = styled.div`
  position: relative;
  padding-left: 10px;
  margin-top: 12px;
  box-shadow: 0 1px 0 0 #E5E5E5, 0 -1px 0 0 #E5E5E5;
  height: 44px;
  line-height: 44px;
  background: #fff;
`;

const Icon = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 12px;
  margin: auto;
  height: 16px;
`;

const Red = styled.span`
  padding-right: 10px;
  color: #F53E31;
  vertical-align: sub;
`;

const DateCmp = styled.div`
  position: relative;
  float: right;
  color: #999999;
  margin-right: 30px;
  min-width: 100px;
  min-height: 44px;
`;

// 交货日期
export default class DeliveryDate extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <Root>
        <Red>*</Red>交货日期
        <DateCmp>
          {value}
          <DateSel value={value} onChange={onChange} />
        </DateCmp>
        <Icon src={arrow}/>
      </Root>
    );
  }
}
