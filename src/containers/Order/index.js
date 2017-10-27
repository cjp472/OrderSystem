import React, { Component, PropTypes } from 'react';
import Header from 'components/Navigate';
import search from 'components/icons/search.png';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/Loading';
import Nav from './Nav';
import Card from './Card';
import NoData from 'components/NoData';
import Load from 'components/Load';
import noGoods from 'components/icons/noGoods.png';
import { connect } from 'react-redux';
import { getOrders, navChange, initNavType, initData } from 'redux/modules/order';
import { push, goBack } from 'react-router-redux';
import styled from 'styled-components';

const Root = styled.div`
  padding-top: 44px;
`;

const Container = styled.div`
  margin-bottom: 10px;
`;

@connect(state => ({
  orderStatus: state.order.orderStatus,
  currentStatus: state.order.currentStatus,
  page: state.order.page,
  rows: state.order.rows,
  hasMore: state.order.hasMore,
  orders: state.order.orders,
  isLoading: state.order.isLoading,
}), {
  getOrders,
  navChange,
  initNavType,
  pushState: push,
  goBack,
  initData
})
export default class Order extends Component {
  static propTypes = {
    orderStatus: PropTypes.array,
    currentStatus: PropTypes.string,
    navChange: PropTypes.func,
    getOrders: PropTypes.func,
    pushState: PropTypes.func,
    initNavType: PropTypes.func,
    page: PropTypes.number,
    rows: PropTypes.number,
    hasMore: PropTypes.bool,
    orders: PropTypes.array,
    isLoading: PropTypes.bool,
    goBack: PropTypes.func,
    initData: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { type, isFromApp } = this.props.location.query; // eslint-disable-line
    if (type) {
      this.props.initNavType(type);
    }
    // 初始化数据
    this.props.initData();
    setTimeout(() => {
      const params = {
        page: this.props.page,
        rows: this.props.rows,
        em_order_status: this.props.currentStatus
      };
      this.props.getOrders(params).then((result) => {
        if (result.code !== '1') {
          alert('订单请求失败，请稍后重试');
        }
      });
    }, 0);
    // 注册给客户端调用的返回事件
    if (isFromApp !== '1') {
      window.addEventListener('onBackPress', this.props.goBack);
    }
  }

  componentWillUnmount() {
    const { isFromApp } = this.props.location.query; // eslint-disable-line
    if (isFromApp !== '1') {
      window.removeEventListener('onBackPress', this.props.goBack);
    }
  }

  navChange = (code) => {
    this.props.navChange(code);
    setTimeout(() => {
      const params = {
        page: this.props.page,
        rows: this.props.rows,
        em_order_status: this.props.currentStatus
      };
      this.props.getOrders(params).then((result) => {
        if (result.code !== '1') {
          alert('订单请求失败，请稍后重试');
        }
      });
    }, 0);
  }

  rightClick = () => {
    this.props.pushState('/_react_/order/search');
  }

  loadData = () => {
    const params = {
      page: this.props.page,
      rows: this.props.rows,
      em_order_status: this.props.currentStatus
    };
    this.props.getOrders(params).then((result) => {
      if (result.code !== '1') {
        alert('订单请求失败，请稍后重试');
      }
    });
  }

  render() {
    const { orderStatus, hasMore, orders, isLoading } = this.props;
    const { isFromApp } = this.props.location.query; // eslint-disable-line
    let Cards = null;
    if (!isLoading && orders.length) {
      Cards = orders && orders.map((order, index) => (
        <Card key={index} item={order} />
      ));
    } else if (isLoading) {
      Cards = null;
    } else {
      Cards = <NoData text={'暂无数据'} img={noGoods} />;
    }
    return (
      <Root>
        <Header title="我的进货单" menuIcon={search} rightClick={this.rightClick} isFromApp={isFromApp} />
        <Nav items={orderStatus} onClick={this.navChange} />
        {!isLoading && <InfiniteScroll
          pageStart={0}
          loadMore={this.loadData}
          hasMore={hasMore}
          loader={<Loading />}
          useWindow
        >
          <Container>
            {Cards}
          </Container>
        </InfiniteScroll>}
        {isLoading && <Load />}
      </Root>
    );
  }
}
