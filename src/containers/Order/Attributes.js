import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import arrow from 'components/icons/arrow.png';

const Root = styled.div`
  background: #fff;
  padding: 12px;
  box-shadow: ${props => props.noborder ? 'none' : ' 0px 1px 0 0 #E5E5E5, 0px -1px 0 0 #E5E5E5'};
`;

const Attr = styled.div`
  display: ${props => props.wrap ? 'block' : 'flex' };
  margin-right: 6px;
  font-size: 15px;
  color: #999999;
  align-items: center;
`;

const Value = styled.div`
  flex: 1;
  padding-right: ${props => props.right ? '0' : '20px' } ;
  color: ${props => props.red ? '#EB464A' : '#000' };
  text-align: ${props => props.right ? 'right' : 'left' } ;
`;

const Arrow = styled.img`
  height: 16px;
`;

export default class Attributes extends Component {
  static propTypes = {
    items: PropTypes.array,
    right: PropTypes.bool,
    wrap: PropTypes.bool,
    noborder: PropTypes.bool,
    style: PropTypes.object,
    getAddress: PropTypes.func,
    showLabel: PropTypes.bool,
  };

  static defaultProps = {
    showLabel: false
  }

  constructor(props, context) {
    super(props, context);
  }

  getAddress = () => {
    const { getAddress } = this.props;
    if (getAddress) {
      getAddress();
    }
  }

  render() {
    const {items = [], right, wrap, noborder, style, showLabel } = this.props;
    return (
      <Root style={style} noborder={noborder} onClick={this.getAddress}>
        {items.map((item, index) => {
          return (
          showLabel ?
          <Attr onClick={item.onClick} key={index} wrap={wrap}>{item.name}：
            <Value right={right} red={item.isPrice}>{item.value}</Value>
            { item.hasArrow && <Arrow src={arrow} />}
          </Attr> :
          item.value && <Attr onClick={item.onClick} key={index} wrap={wrap}>{item.name}：
            <Value right={right} red={item.isPrice}>{item.value}</Value>
            { item.hasArrow && <Arrow src={arrow} />}
          </Attr>
          );
        })}
      </Root>
    );
  }
}
