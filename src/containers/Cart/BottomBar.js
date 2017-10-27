import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #FFFFFF;
  box-shadow: 0 -4px 12px 0 rgba(0,0,0,0.08), inset 0 1px 0 0 #E0E0E0;
  font-size: 16px;
  height: 50px;
  padding: 14px;
  box-sizing: border-box;
`;

export default class BottomBar extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root>
        {this.props.children}
      </Root>
    );
  }
}
