import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  box-shadow: 0 1px 0 0 #E5E5E5;
  height: 44px;
  padding: 10px 12px;
  box-sizing: border-box;
  color: #999;
  font-size: 15px;
`;

const Num = styled.span`
  color: #000;
`;

const Btn = styled.div`
  float: right;
  margin-top: -2px;
  border: 1px solid #EB464A;
  border-radius: 3px;
  font-size: 13px;
  color: #EB464A;
  padding: 4px 20px 2px;
`;

export default class Total extends Component {
  static propTypes = {
    num: PropTypes.string,
    label: PropTypes.string,
    isSign: PropTypes.bool,
    onConfirm: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {num, label, isSign} = this.props;
    return (
      <Root>
        合计实收数量：<Num>{num}</Num>
        {!isSign && <Btn onClick={this.props.onConfirm}>{label}</Btn>}
      </Root>
    );
  }
}
