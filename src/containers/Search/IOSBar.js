import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Input from './Input';

const Root = styled.div`
  display: flex;
  height: 44px;
  box-shadow: 0 1px 0 0 #E5E5E5;
  background-color: #fff;
  padding: 8px 12px;
  box-sizing: border-box;
`;

const Cancel = styled.div`
  font-size: 15px;
  color: #666666;
  line-height: 30px;
  padding-left: 10px;
`;

export default class IOSBar extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root>
        <Input/>
        <Cancel onClick={() => history.back()}>取消</Cancel>
      </Root>
    );
  }
}
