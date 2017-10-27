import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import BottomBar from './BottomBar';
import Check from './Check';

const DeleteBtn = styled.div`
  position: absolute;
  background: #EB464A;
  height: 50px;
  right: 0;
  top: 0;
  width: 120px;
  color: #fff;
  padding-top: 12px;
  text-align: center;
  box-sizing: border-box;
  font-size: 17px;
`;

export default class DeleteBar extends Component {
  static propTypes = {
    deleteGoods: PropTypes.func,
    checked: PropTypes.bool,
    checkAllChange: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { checked } = this.props;
    return (
      <BottomBar>
        <Check checked={checked} checkChange={this.props.checkAllChange}/>
        <DeleteBtn onClick={this.props.deleteGoods}>删除</DeleteBtn>
      </BottomBar>
    );
  }
}
