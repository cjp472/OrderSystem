import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Img from './Img';
import noImg from 'containers/Goods/Main/noImg.png';
import { getLocalData } from 'utils/localStorage';
import { judgeImgUrl } from 'utils/utils';

const Root = styled.div`
  display: flex;
  background: #fff;
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
  max-height: 38px;
  overflow: hidden;
`;

const Badge = styled.span`
  background-color: #FF7575;
  color: #FFF;
  font-size: 12px;
  padding: 2px;
  border-radius: 2px;
  margin-right: 5px;
`;

const SubTitle = styled.div`
  margin-left: 12px;
  font-size: 12px;
  color: #999;
`;

const CountContainer = styled.div`
  font-size: 12px;
  color: #999;
  margin: 0 12px;
`;

const Item = styled.span`
  margin-right: 15px;
`;

export default class GoodItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    isHideSign: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { item, isHideSign } = this.props;
    const img = item.picUrl;
    const imageUrl = getLocalData('goods', 'imageUrl');
    const imgSrc = judgeImgUrl(imageUrl, img);
    return (
      <Root>
        <Img src={img ? imgSrc : noImg} />
        <Body>
          <Title>
            {item.isGift ? <Badge>赠</Badge> : null}
            {item.title}
          </Title>
          <SubTitle>{item.subtitle}</SubTitle>
          <CountContainer>
            <Item>出库数量：{item.sentNum}</Item>
            {!isHideSign && <Item>签收数量：{item.signNum}</Item>}
          </CountContainer>
        </Body>
      </Root>
    );
  }
}
