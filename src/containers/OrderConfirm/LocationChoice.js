import React, { Component, PropTypes } from 'react';
import Location from '../OrderDetail/Location';
import company from 'components/icons/company.png';
import border from './border.png';
import styled from 'styled-components';
import arrow from 'components/icons/arrow.png';

const Root = styled.div`
  position: relative;
`;

const Border = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 3px;
  background-image: url(${border});
  background-size: cover
`;

const Icon = styled.img`
  position: absolute;
  top: 44px;
  bottom: 0;
  right: 12px;
  margin: auto;
  height: 16px;
`;

export default class LocationChoice extends Component {
  static propTypes = {
    customer: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    getAddress: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { customer, name, phone, address, getAddress } = this.props;
    const items = [
      {
        name: '收货人',
        value: name
      },
      {
        name: '联系手机',
        value: phone
      },
      {
        name: '收货地址',
        value: address
      }
    ];
    return (
      <Root>
        <Location
          name={customer}
          icon={company}
          items={items}
          getAddress={getAddress}
        />
        <Icon src={arrow}/>
        <Border/>
      </Root>
    );
  }
}
