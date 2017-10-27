import React, { Component, PropTypes } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/Loading';
import AndroidBar from 'containers/Search/AndroidBar';
import Card from 'containers/Order/Card';
import Load from 'components/Load';
// import IOSBar from './IOSBar';
// import History from './History';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { getOrders, initData } from 'redux/modules/orderSearch';
import { setBackEnable } from 'utils/WqJsBridge';

const Container = styled.div`
  margin-bottom: 10px;
`;

const NoResult = styled.div`
  color: #999999;
  font-size: 14px;
  margin-top: 30px;
  text-align: center;
`;

@connect(state => ({
  page: state.orderSearch.page,
  rows: state.orderSearch.rows,
  hasMore: state.orderSearch.hasMore,
  orders: state.orderSearch.orders,
  hasData: state.orderSearch.hasData,
  isLoading: state.orderSearch.isLoading,
}), {
  getOrders,
  initData,
  goBack
})

export default class Search extends Component {
  static propTypes = {
    orders: PropTypes.array,
    page: PropTypes.number,
    rows: PropTypes.number,
    hasMore: PropTypes.bool,
    hasData: PropTypes.bool,
    getOrders: PropTypes.func,
    goBack: PropTypes.func,
    initData: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      searchValue: ''
    };
  }

  componentDidMount() {
    setBackEnable(true);
    // 注册给客户端调用的返回事件
    window.addEventListener('onBackPress', this.props.goBack);
    if (window._react_page_action === 'POP') {
      return;
    }
    this.props.initData();
  }

  componentWillUnmount() {
    setBackEnable(false);
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  searchOrders = (value) => {
    this.setState({searchValue: value});
    const params = {
      page: this.props.page,
      rows: this.props.rows,
      search_key: value
    };
    this.props.getOrders(params, false).then((result) => {
      if (result.code !== '1') {
        alert('订单请求失败，请稍后重试');
      }
    });
  }

  loadData = () => {
    const params = {
      page: this.props.page,
      rows: this.props.rows,
      search_key: this.state.searchValue
    };
    this.props.getOrders(params, true).then((result) => {
      if (result.code !== '1') {
        alert('订单请求失败，请稍后重试');
      }
    });
  }

  render() {
    const { orders, hasData, isLoading } = this.props;
    return (
      <div>
        {/* this.state.os === 'iOS' ? <IOSBar/> : <AndroidBar searchGoods={this.searchGoods}/> */}
        <AndroidBar placeholder={'商品名称/订单ID'} searchEvent={this.searchOrders} />
        {!isLoading && <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={this.loadData}
          hasMore={this.props.hasMore}
          loader={<Loading />}
          useWindow
          >
          <Container>
            {orders && orders.map((order, index) => (
              <Card key={index} item={order} />
            ))}
          </Container>
        </InfiniteScroll>}
        { (!isLoading && !hasData) && <NoResult>没有找到相关订单</NoResult> }
        { isLoading && <Load />}
      </div>
    );
  }
}
