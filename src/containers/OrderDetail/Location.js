import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Attributes from '../Order/Attributes';

const Root = styled.div`
  background: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 1px 0 0 #E5E5E5, 0px -1px 0 0 #E5E5E5;
`;

const Head = styled.div`
  padding: 12px;
  box-shadow: 0px 1px 0 0 #E5E5E5;
  margin-bottom: 1px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  margin-bottom: -1px;
`;

export default class Location extends Component {
  static propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    items: PropTypes.array,
    getAddress: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { name, icon, items, getAddress } = this.props;
    return (
      <Root>
        <Head>
          <Icon src={icon}/>
          { name }
        </Head>
        <Attributes showLabel items={items} getAddress={getAddress} />
      </Root>
    );
  }
}
