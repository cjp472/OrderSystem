import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Attributes from '../Order/Attributes';

const Root = styled.div`
  margin-top: 10px;
  min-height: 80px;
  background: #fff;
  box-shadow: 0px 1px 0 0 #E5E5E5, 0px -1px 0 0 #E5E5E5;
`;

export default class Message extends Component {
  static propTypes = {
    label: PropTypes.string,
    message: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { label, message } = this.props;
    const items = [{name: label, value: message}];
    return (
      <Root>
        <Attributes noborder wrap items={items}/>
      </Root>
    );
  }
}
