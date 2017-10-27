import React, { Component, PropTypes } from 'react';
import Navigate from 'components/Navigate';
import styled from 'styled-components';
import right from './right.png';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { goHome, showTab } from 'utils/WqJsBridge';


const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  text-align: center;
`;

const Image = styled.img`
  width: 90px;
  height: 90px;
  position: relative;
  left: 0;
  right: 0;
  margin: 10px auto;
`;

const Text = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
`;

const Btn = styled.div`
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 3px;
  font-size: 16px;
  line-height: 45px;
  color: #000000;
  margin: 7px 15px;
`;

@connect(null, {
  pushState: push
})
export default class OrderSuccess extends Component {
  static propTypes = {
    pushState: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  goHome = () => {
    try {
      showTab();
      goHome();
      this.props.pushState('/_react_/cart?isFromApp=1');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Root>
        <Navigate title="订单提交" canBack={false} />
        <Image src={right}/>
        <Text>提交成功</Text>
        <Btn onClick={() => this.props.pushState('/_react_/order')}>查看订单</Btn>
        <Btn onClick={this.goHome}>返回首页</Btn>
      </Root>
    );
  }
}
