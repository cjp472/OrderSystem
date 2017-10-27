import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import sicon from './search.png';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {hideTab} from 'utils/WqJsBridge';

const Root = styled.div`
  height: 44px;
  padding: 8px 12px;
  box-sizing: border-box;
  background-color: #FFF;
`;

const Container = styled.div`
  background: #EDEEF0;
  border-radius: 5px;
  height: 28px;
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 8px;
  margin-left: 8px;
`;

const PlaceHoder = styled.span`
  color: #999;
  font-size: 14px;
  vertical-align: middle;
  line-height: 28px;
`;

@connect(null, {
  pushState: push
})

export default class Search extends Component {
  static propTypes = {
    name: PropTypes.string,
    pushState: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  goSearch = () => {
    try {
      hideTab();
    } catch (error) {
      console.log(error);
    }
    this.props.pushState('/_react_/goods/search');
  }

  render() {
    return (
      <Root>
        <Container onClick={this.goSearch}>
          <Icon src={sicon} alt=""/>
          <PlaceHoder>输入名称查找商品</PlaceHoder>
        </Container>
      </Root>
    );
  }
}
