import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import arrow from 'components/icons/arrow.png';

const Root = styled.div`
  padding: 12px;
  margin-top: 10px;
  background: #fff;
  box-shadow: 0px 1px 0 0 #E5E5E5, 0px -1px 0 0 #E5E5E5;
`;

const Icon = styled.img`
  float: right;
  height: 16px;
  margin-top: 5px;
`;

export default class DeliverLog extends Component {
  static propTypes = {
    name: PropTypes.string,
    goDelivery: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root onClick={this.props.goDelivery}>
        发货记录
        <Icon src={arrow}/>
      </Root>
    );
  }
}
