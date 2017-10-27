import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Slide from 'containers/Slide';
import Footer from './Footer';
import Head from './Head';
import Attribute from './Attribute';
import Navigate from 'components/Navigate';
import PicDetail from './PicDetail';
import Toast from 'components/Toast';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { getDetail, countChange, unitChange, initSlide, showSlide, hideSlide, addInCart} from 'redux/modules/detail';
import {getCartCount} from 'redux/modules/cart';
import Load from 'components/Load';

const Root = styled.div`
  background: #f0f1f2;
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  margin-top: 44px;
`;

const DetailContainer = styled.div`
  margin-bottom: 50px;
`;

@connect(state => ({
  detail: state.detail.detail,
  slideShow: state.detail.slideShow,
  xDis: state.detail.xDis,
  priceVisible: state.detail.priceVisible,
  isLoading: state.detail.isLoading,
}), {
  getDetail,
  initSlide,
  showSlide,
  hideSlide,
  countChange,
  unitChange,
  addInCart,
  getCartCount,
  goBack,
})

export default class Detail extends Component {
  static propTypes = {
    slideShow: PropTypes.bool,
    xDis: PropTypes.number,
    detail: PropTypes.object,
    getDetail: PropTypes.func,
    initSlide: PropTypes.func,
    showSlide: PropTypes.func,
    hideSlide: PropTypes.func,
    countChange: PropTypes.func,
    unitChange: PropTypes.func,
    addInCart: PropTypes.func,
    getCartCount: PropTypes.func,
    priceVisible: PropTypes.bool,
    goBack: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      toastShow: false
    };
  }

  componentDidMount() {
      // 强制宽度
    this.root.style.width = window.innerWidth + 'px';
    const { id } = this.props.params; // eslint-disable-line
    this.props.getDetail({pd_id: id}).then((result) => {
      if (result.code !== '1') {
        alert('商品详情获取失败，请稍后重试');
      }
    });
    // 注册给客户端调用的返回事件
    window.addEventListener('onBackPress', this.props.goBack);
  }

  componentWillUnmount() {
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  convertGood = (good) => {
    const unitId = good.units.filter((unit) => {
      return unit.active;
    })[0].id;
    return {
      'pd_id': good.id,
      'unit_id': unitId,
      'item_type': good.itemType,
      'item_count': good.count,
      'bind_mz_promotion_id': good.promotionId,
    };
  }

  showSlideEvent = () => {
    const xDis = parseInt(window.innerWidth * 0.2, 10);
    this.props.showSlide(xDis);
  }

  hideSlideEvent = () => {
    const xDis = window.innerWidth;
    this.props.hideSlide(xDis);
  }

  addInCart = () => {
    const good = this.props.detail;
    const params = this.convertGood(good);
    this.props.addInCart(params).then((result) => { // 加入购物车成功后  显示toast提示
      if (result.code === '1') {
        this.setState({toastShow: true});
        setTimeout(() => {
          this.setState({toastShow: false});
          this.hideSlideEvent();
        }, 300);
      } else {
        alert('加入购物车失败，请稍后重试');
      }
      this.props.getCartCount();
    });
  }

  render() {
    const { slideShow, xDis, detail, priceVisible, isLoading } = this.props;
    const { toastShow } = this.state;
    const { isFromApp } = this.props.location.query; // eslint-disable-line
    const pageFrom = 'detail'; // list 列表 detail 详情
    let DetailElem = null;
    if (detail) {
      const { imgs, title, subtitle, tag, items, picDetail, id } = detail;
      DetailElem = (
        <Container>
          <Head
            imgs={imgs}
            title={<span>{title}</span>}
            subtitle={subtitle}
            tag={tag}
            id={id}
          />
          <DetailContainer>
            <Attribute items={items}/>
            {picDetail && <PicDetail detail={picDetail}/>}
          </DetailContainer>
          <Footer addInCart={this.showSlideEvent}/>
          <Slide
            pageFrom={pageFrom}
            xDis={xDis}
            good={detail}
            priceVisible={priceVisible}
            show={slideShow}
            hideSlide={this.hideSlideEvent}
            addInCart={this.addInCart}
            countChange={this.props.countChange}
            unitChange={this.props.unitChange}
          />
        </Container>
      );
    }
    return (
      <div>
        <Root innerRef={root => this.root = root}>
          <Navigate title="商品" isFromApp={isFromApp} />
          {DetailElem}
        </Root>
        <Toast show={toastShow} title={'加入购物车成功'} />
        {isLoading && <Load />}
      </div>
    );
  }
}
