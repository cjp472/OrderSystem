import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import PriceCmp from 'components/Price';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ck from 'components/icons/checked.png';
import uck from 'components/icons/unchecked.png';
import noImg from './noImg.png';
import {hideTab} from 'utils/WqJsBridge';
import { getLocalData } from 'utils/localStorage';
import { judgeImgUrl } from 'utils/utils';

const Container = styled.div`
  display: flex;
  margin-bottom: -1px;
  padding: 12px;
  position: relative;
  height: 109px;
  background-color: ${props => props.color};
  box-sizing: border-box;
  overflow: hidden;
  flex: 1;
  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: ${props => props.left}px;
    width: 100%;
    height: 1px;
    background-color: #f0f1f2;
  }
`;

const ImgContainer = styled.div`
  width: 85px;
  height: 85px;
  position: relative;
`;

const Img = styled.img`
  border: ${props => props.noImg ? 'none' : '1px solid #EEEEEE' };
  width: 85px;
  height: 85px;
`;

const Mark = styled.span`
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 13px;
  text-align: center;
  color: #FFF;
  background-color: ${props => props.red ? '#FF7575' : '#FF9008' };
  opacity: 0.85;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Title = styled.div`
  position: absolute;
  right: 6px;
  top: 2px;
  left: 12px;
  color: #000;
  font-size: 14px;
  line-height: 1.4;
  height: 38px;
  overflow: hidden;
`;

// const SubTitle = styled.div`
//   font-size: 12px;
//   color: #999999;
// `;

const Price = styled.div`
  position: absolute;
  bottom: 0;
  left: 12px;
`;

const Body = styled.div`
  flex: 1;
  position: relative;
`;

const CkImg = styled.img`
  width: 18px;
  height: 18px;
  margin: 35px 10px 45px 0;
`;

const Padding = styled.div`
  width: 28px;
`;

@connect(null, {
  pushState: push
})

export default class GoodItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    cartId: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    isGift: PropTypes.bool,
    isPromotion: PropTypes.bool,
    price: PropTypes.string,
    children: PropTypes.node,
    pushState: PropTypes.func,
    left: PropTypes.number,
    checked: PropTypes.bool,
    checkChange: PropTypes.func,
    padding: PropTypes.bool,
    color: PropTypes.string,
    noHref: PropTypes.bool, // 进货单列表页面用， 进货单列表页不需要进到商品详情
  };

  static defaultProps = {
    noHref: false
  }

  constructor(props, context) {
    super(props, context);
  }

  open = (id) => {
    const { noHref } = this.props; // 点击不做任何操作
    if (noHref) return;
    try {
      hideTab();
    } catch (error) {
      console.log(error);
    }
    this.props.pushState(`/_react_/goods/detail/${id}`);
  }

  render() {
    const {id, cartId, padding, img, title, price, isGift, isPromotion, children, left, checked, checkChange, color } = this.props;
    const imageUrl = getLocalData('goods', 'imageUrl');
    const imgSrc = judgeImgUrl(imageUrl, img);
    return (
      <Container left={left} color={color} >
        {padding && <Padding/>}
        {checked !== undefined && <CkImg onClick={() => checkChange(!checked, cartId)} src={checked ? ck : uck} alt=""/>}
        <ImgContainer>
          <Img src={img ? imgSrc : noImg} noImg={img ? false : true} onClick={() => this.open(id)}/>
          {isPromotion && <Mark >促销</Mark>}
          {isGift && <Mark red>赠品</Mark>}
        </ImgContainer>
        <Body>
          <Title>
            {title}
            {/* <SubTitle>{subtitle}</SubTitle>*/}
          </Title>
          {(price || price === 0) && <Price><PriceCmp price={price}/></Price>}
        </Body>
        {children}
      </Container>
    );
  }
}

GoodItem.defaultProps = {
  left: 109
};
