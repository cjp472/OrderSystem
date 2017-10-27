import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  height: 25px;
  font-size: 12px;
  background: #FFF9E1;
  color: #666;
  box-sizing: border-box;
  padding: 4px 10px 4px 40px;
  margin-top: -1px;
  z-index: 1;
  position: relative;
  border-bottom: 1px solid #f0f1f2;
`;

const Right = styled.div`
  float: right;
`;

export default class Gift extends Component {
  static propTypes = {
    title: PropTypes.string,
    tip: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {title, tip} = this.props;
    return (
      <Root>
        {title}
        <Right>{tip}</Right>
      </Root>
    );
  }
}
