import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  box-shadow: 0 1px 0 0 #E5E5E5;
  height: 47px;
  box-sizing: border-box;
  background: #FAFAFA;
  overflow-x: scroll;
`;

const Item = styled.div`
  min-width: 45px;
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  color: #666666;
  line-height: 50px;
  text-align: center;
  border-bottom: ${props => props.selected ? '3px solid #EB464A' : 'none' };
`;

export default class Nav extends Component {
  static propTypes = {
    items: PropTypes.array,
    onClick: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { items } = this.props;
    return (
      <Root>
        {items && items.map((item, index) => {
          return <Item key={index} selected={item.selected} onClick={() => {this.props.onClick(item.code);}}>{item.value}</Item>;
        })}
      </Root>
    );
  }
}
