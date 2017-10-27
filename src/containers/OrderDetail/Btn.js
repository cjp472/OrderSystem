import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  flex: 1;
  border-right: 1px solid #E5E5E5;
  text-align: center;
  line-height: 50px;
  display: ${props => props.show ? 'block' : 'none'};
`;

export default class Btn extends Component {
  static propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
    onClick: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root show={this.props.show} onClick={this.props.onClick}>
        {this.props.children}
      </Root>
    );
  }
}
