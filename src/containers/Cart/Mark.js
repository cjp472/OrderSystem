import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 10px;
  color: #EB464A;
  line-height: 10px;
  border-radius: 2px;
  border: 1px solid #EB464A;
  padding: 2px 4px 0;
  vertical-align: bottom;
  margin-right: 8px;
  height: 12px;
  width: 20px;
  margin-left: 10px;
`;

export default class Mark extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root>
        <Name>失效</Name>
      </Root>
    );
  }
}
