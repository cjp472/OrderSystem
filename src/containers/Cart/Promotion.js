import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { hideTab } from 'utils/WqJsBridge';

const Root = styled.div`
  display: flex;
  height: ${props => props.padding ? '40px' : '28px'};
  box-sizing: border-box;
  padding-top: 12px;
  font-size: 12px;
  color: #666;
  padding-left: 10px;
`;

const Tip = styled.span`
  font-size: 10px;
  color: #EB464A;
  line-height: 10px;
  border-radius: 2px;
  border: 1px solid #EB464A;
  margin-right: 8px;
  width: 22px;
  height: 10px;
  text-align: center;
  padding: 2px 0;
`;

const Title = styled.span`
  flex: 1;
`;

const Link = styled.span`
  font-size: 12px;
  color: #EB464A;
  margin-right: 12px;
`;

@connect(null, {
  pushState: push
})
export default class Promotion extends Component {
  static propTypes = {
    href: PropTypes.string,
    pushState: PropTypes.func,
    tip: PropTypes.string,
    title: PropTypes.string,
    padding: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  goPromotionDetail = () => {
    const {pushState, href} = this.props;
    pushState(href);
    try {
      hideTab();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {href, tip, title, padding} = this.props;
    return (
      <Root padding={padding}>
        <Tip>{tip}</Tip>
        <Title>{title}</Title>
        {href && <Link onClick={this.goPromotionDetail}>查看促销</Link>}
      </Root>
    );
  }
}
