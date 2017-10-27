import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import demo from 'containers/Detail/demo.jpeg';
import Price from 'components/Price';
import Img from './Img';

const Root = styled.div`
  display: flex;
  background: ${props => props.white ? '#fff' : '#FAFAFA'};
  box-shadow: inset 0 -1px 0 0 #E5E5E5, 0 -1px 0 0 #E5E5E5;
  height: 109px;
  box-sizing: border-box;
  padding: 12px;
`;

const Body = styled.div`
  flex: 1;
  position: relative;
`;

const Title = styled.div`
  font-size: 14px;
  margin-left: 12px;
`;

const PriceContiner = styled.div`
  position: absolute;
  left: 12px;
  bottom: 0;
`;

const Tag = styled.div`
  color: #999999;
  font-size: 12px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export default class GoodItem extends Component {
  static propTypes = {
    white: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {white} = this.props;
    return (
      <Root white={white}>
        <Img src={demo}/>
        <Body>
          <Title>哈根达斯哈根达斯哈根达斯</Title>
          <PriceContiner>
            <Price price={100}/>
          </PriceContiner>
          <Tag>x1 箱</Tag>
        </Body>
      </Root>
    );
  }
}
