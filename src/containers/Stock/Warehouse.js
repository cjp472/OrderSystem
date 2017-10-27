import React, { Component, PropTypes } from 'react';
import Attributes from '../Order/Attributes';
import styled from 'styled-components';

const Root = styled.div`
  position: relative;
`;

export default class Warehouse extends Component {
  static propTypes = {
    sentTime: PropTypes.string,
    storeName: PropTypes.string,
    goStockSelect: PropTypes.func,
    isSign: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { sentTime, storeName, goStockSelect, isSign } = this.props;
    return (
      <Root>
        <Attributes items={[
          {
            name: '发货时间',
            value: sentTime
          },
          {
            name: '收货仓库',
            value: storeName,
            hasArrow: isSign ? false : true,
            onClick: isSign ? null : goStockSelect
          }
        ]}/>
      </Root>
    );
  }
}
