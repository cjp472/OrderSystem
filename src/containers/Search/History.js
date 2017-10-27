import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import trashpng from './trash.png';

const Root = styled.div`
  margin-top: 1px;
  background-color: #fff;
  box-shadow: 0 1px 0 0 #E5E5E5;
  padding: 15px 12px;
  position: relative;
`;

const Tilte = styled.div`
  color: #000;
  font-size: 13px;
  margin-bottom: 5px;
`;

const Tag = styled.span`
  display: inline-block;
  background: #F0F2F5;
  border-radius: 4px;
  font-size: 13px;
  color: #666666;
  padding: 2px 10px;
  margin-right: 10px;
`;

const DeleteContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 15px;
  font-size: 12px;
  color: #666;
`;

const IconPng = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: -3px;
  margin-right: 3px;
`;

export default class History extends Component {
  static propTypes = {
    names: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Root>
        <Tilte>搜索历史</Tilte>
        {this.props.names.map((name, index) => <Tag key={index}>{name}</Tag>)}
        <DeleteContainer>
          <IconPng src={trashpng}/>
          清除
        </DeleteContainer>
      </Root>
    );
  }
}
