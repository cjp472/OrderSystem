import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: relative;
  padding: 22px 45px;
  background-color: #f0f1f2;
`;

const Hr = styled.div`
  height: 1px;
  background: #ccc;
`;

const Name = styled.div`
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  margin: auto;
  width: 100px;
  font-size: 14px;
  color: #333;
  text-align: center;
  background: #f0f1f2;
`;

export default class Title extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root>
        <Hr/>
        <Name>{this.props.name}</Name>
      </Root>
    );
  }
}
