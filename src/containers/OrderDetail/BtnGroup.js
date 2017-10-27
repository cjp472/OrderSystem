import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  margin-top: 10px;
  background: #fff;
  box-shadow: 0px 1px 0 0 #E5E5E5, 0px -1px 0 0 #E5E5E5;
  height: 50px;
  margin-right: -1px;
  display: ${props => props.show ? 'flex' : 'none'};
`;

export default class BtnGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { show } = this.props;
    return (
      <Root show={show}>
        {this.props.children}
      </Root>
    );
  }
}
