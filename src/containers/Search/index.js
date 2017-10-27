import React, { Component, PropTypes } from 'react';
import MobileDetect from 'mobile-detect';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/Loading';
import AndroidBar from './AndroidBar';
// import IOSBar from './IOSBar';
// import History from './History';
import styled from 'styled-components';
import Cart from './Cart';
import Header from './Header';
import Slide from 'containers/Slide';
import Toast from 'components/Toast';
import Plus from 'containers/Goods/Main/Plus';
import { connect } from 'react-redux';
import { getGoods, initSlide, showSlide, hideSlide, getCurrGood, countChange, unitChange, addInCart, initData } from 'redux/modules/search';
import GoodItem from 'containers/Goods/Main/GoodItem';
import { goBack } from 'react-router-redux';
import {closeWindow} from 'utils/WqJsBridge';
import {getCartCount} from 'redux/modules/cart';
import Load from 'components/Load';

const Container = styled.div`
  background-color:#FFF;
  flex: 1;
  border-top: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
  overflow-y: scroll;
`;

const NoResult = styled.div`
  color: #999999;
  font-size: 14px;
  margin-top: 30px;
  text-align: center;
`;

const Title = styled.span`
  font-size: 13px;
`;

const Count = styled.em`
  color: #EB464A;
  font-style: normal;
  padding: 0 3px;
`;

@connect(state => ({
  goods: state.search.goods,
  page: state.search.page,
  rows: state.search.rows,
  hasMore: state.search.hasMore,
  priceVisible: state.search.priceVisible,
  total: state.search.total,
  slideShow: state.search.slideShow,
  xDis: state.search.xDis,
  good: state.search.good,
  hasData: state.search.hasData,
  isLoading: state.search.isLoading,
}), {
  getGoods,
  showSlide,
  initSlide,
  hideSlide,
  getCurrGood,
  countChange,
  unitChange,
  addInCart,
  initData,
  goBack,
  getCartCount,
})

export default class Search extends Component {
  static propTypes = {
    goods: PropTypes.array,
    page: PropTypes.number,
    rows: PropTypes.number,
    hasMore: PropTypes.bool,
    priceVisible: PropTypes.bool,
    getGoods: PropTypes.func,
    total: PropTypes.number,
    showSlide: PropTypes.func,
    initSlide: PropTypes.func,
    hideSlide: PropTypes.func,
    getCurrGood: PropTypes.func,
    countChange: PropTypes.func,
    unitChange: PropTypes.func,
    addInCart: PropTypes.func,
    slideShow: PropTypes.bool,
    initData: PropTypes.func,
    xDis: PropTypes.number,
    good: PropTypes.object,
    location: PropTypes.object,
    hasData: PropTypes.bool,
    goBack: PropTypes.func,
    getCartCount: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      os: '',
      searchValue: '',
      toastShow: false
    };
  }

  componentDidMount() {
    const {code} = this.props.location.query;
    if (code) {
      this.searchGoods(code);
    }
    const md = new MobileDetect(navigator.userAgent);
    setTimeout(() => {
      this.setState({
        os: md.os(),
      });
    });
    // 注册给客户端调用的返回事件
    window.addEventListener('onBackPress', this.props.goBack);

    if (window._react_page_action === 'POP') {
      return;
    }
    this.props.initData();
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
      'bind_mz_promotion_id': good.promotionId
    };
  }

  showSlide = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    const xDis = parseInt(window.innerWidth * 0.2, 10);
    this.props.showSlide(xDis);
    this.props.getCurrGood(id);
  }

  hideSlideEvent = () => {
    const xDis = window.innerWidth;
    this.props.hideSlide(xDis);
  }

  addInCart = () => {
    const good = this.props.good;
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
    });
    this.props.getCartCount();
  }

  searchGoods = (value) => {
    this.setState({searchValue: value});
    const params = {
      page: this.props.page,
      rows: this.props.rows,
      seach_cond: value
    };
    this.props.getGoods(params, false).then((result) => {
      if (result.code !== '1') {
        alert('商品请求失败，请稍后重试');
      }
    });
  }

  loadData = () => {
    const params = {
      page: this.props.page,
      rows: this.props.rows,
      seach_cond: this.state.searchValue
    };
    this.props.getGoods(params, true).then((result) => {
      if (result.code !== '1') {
        alert('商品请求失败，请稍后重试');
      }
    });
  }

  close = () => {
    const {nativeclose} = this.props.location.query;
    if (nativeclose === '1') {
      closeWindow();
    } else {
      history.back();
    }
  }

  render() {
    const { xDis, good, slideShow, hasData, goods, total, priceVisible, isLoading, location: {query: {code}} } = this.props;
    const { toastShow } = this.state;
    const title = <Title>共查询到<Count>{total}</Count>种商品</Title>;
    const pageFrom = 'list'; // list 列表  detail 详情
    return (
      <div>
        {/* this.state.os === 'iOS' ? <IOSBar/> : <AndroidBar searchGoods={this.searchGoods}/> */}
        <AndroidBar placeholder={'商品名称'} defaultValue={code} searchEvent={this.searchGoods} onClose={this.close}/>
        {/* {'' && <History names={['白酒', '青岛', '53度', '勇闯天涯']}/>}*/}
        {(!isLoading && !!total) &&
        <div>
          <Header>{title}</Header>
          <Container>
            <InfiniteScroll
              pageStart={0}
              initialLoad={false}
              loadMore={this.loadData}
              hasMore={this.props.hasMore}
              loader={<Loading />}
              useWindow
              >
              {goods && goods.map((data) => {
                return (
                  <GoodItem
                    key={data.id}
                    id={data.id}
                    img={data.picUrl}
                    title={data.title}
                    subtitle={data.subtitle}
                    isPromotion={data.isPromotion}
                    price={priceVisible ? data.price : null}
                  >
                    <Plus odd={data.odd} id={data.id} onClick={this.showSlide}/>
                  </GoodItem>
                );
              })}
            </InfiniteScroll>
          </Container>
        </div>}
        {(!isLoading && !hasData) && <NoResult>没有找到相关产品</NoResult>}
        <Slide
          pageFrom={pageFrom}
          xDis={xDis}
          good={good}
          show={slideShow}
          priceVisible={priceVisible}
          hideSlide={this.hideSlideEvent}
          countChange={this.props.countChange}
          unitChange={this.props.unitChange}
          addInCart={this.addInCart}
        />
        <Cart number={3}/>
        <Toast show={toastShow} title={'加入购物车成功'} />
        { isLoading && <Load /> }
      </div>
    );
  }
}
