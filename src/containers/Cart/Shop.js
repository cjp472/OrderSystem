import React, { Component, PropTypes } from 'react';
import comp from './comp.png';
import styled from 'styled-components';

const Root = styled.div`
  background: #FAFAFA;
  box-shadow: inset 0 1px 0 0 #E5E5E5;
  font-size: 14px;
  height: 45px;
  padding: 14px 12px;
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 16px;
  margin-right: 8px;
  vertical-align: -2px;
`;

export default class Shop extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root>
        <Icon src={comp}/>
        {this.props.title}
      </Root>
    );
  }
}
