import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
// import backpng from './Back.png';
import {goBack} from 'react-router-redux';
import {connect} from 'react-redux';
import { closeWindow } from 'utils/WqJsBridge';

const Root = styled.div`
  position: fixed;
  height: 44px;
  left: 0;
  top: 0;
  right: 0;
  text-align: center;
  font-size: 17px;
  line-height: 46px;
  z-index: 100;
  box-shadow: 0 1px 0 0 #E5E5E5;
  background-color: #FFF;
`;

const Back = styled.div`
  width: 44px;
  height: 44px;
  position: absolute;
  top: 0px;
`;

const BackIcon = styled.span`
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid #333;
  border-width: 1px 0 0 1px;
  transform: rotate(315deg);
  vertical-align: middle;
  top: 15px;
  left: 20px;
`;

// const BackText = styled.span`
//   color: #333333;
//   font-size: 17px;
//   vertical-align: middle;
// `;

const Menu = styled.div`
  position: absolute;
  font-size: 16px;
  color: #666666;
  right: 12px;
  top: 0px;
`;

const Icon = styled.img`
  position: absolute;
  width: 20px;
  color: #666666;
  right: 12px;
  top: 12px;
`;

@connect(null, {
  goBack
})
export default class Navigate extends Component {
  static propTypes = {
    title: PropTypes.string,
    menu: PropTypes.string,
    menuIcon: PropTypes.string,
    rightClick: PropTypes.func,
    canBack: PropTypes.bool,
    goBack: PropTypes.func,
    isFromApp: PropTypes.string,
  };

  static defaultProps = {
    canBack: true
  };

  constructor(props, context) {
    super(props, context);
  }

  back = () => {
    const { isFromApp } = this.props;
    if (isFromApp === '1') {
      try {
        closeWindow();
      } catch (error) {
        console.log(error);
      }
    } else {
      this.props.goBack();
    }
  }

  render() {
    const {title, menu, menuIcon, canBack} = this.props;
    return (
      <Root>
        {canBack && <Back onClick={this.back}>
          <BackIcon />
          {/* <BackText>返回</BackText>*/}
        </Back>}
        {title}
        {menu && <Menu onClick={this.props.rightClick}>{menu}</Menu>}
        {menuIcon && <Icon onClick={this.props.rightClick} src={menuIcon}/>}
      </Root>
    );
  }
}
