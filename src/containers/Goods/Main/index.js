import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import GoodItem from './GoodItem';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/Loading';
import Plus from './Plus';
import NoData from 'components/NoData';
import noGoods from 'components/icons/noGoods.png';
import {showTab} from 'utils/WqJsBridge';

const Container = styled.div`
  background-color:#FFF;
  flex: 1;
  border-top: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
  overflow-y: auto;
  -webkit-overflow-scrolling : touch;
  min-height: 300px;
`;

export default class Main extends Component {
  static propTypes = {
    goods: PropTypes.array,
    page: PropTypes.number,
    rows: PropTypes.number,
    currentType: PropTypes.string,
    hasMore: PropTypes.bool,
    priceVisible: PropTypes.bool,
    getGoods: PropTypes.func,
    showSlide: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // 强制容器的高度 44: 搜索框的高度
    try {
      showTab();
    } catch (error) {
      console.log(error);
    }
  }

  loadData = () => {
    this.props.getGoods();
  }

  showSlide = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.showSlide(id);
  }

  render() {
    const { goods, priceVisible, isLoading } = this.props; // 商品类型
    const goodItems = goods && goods.map((good, index) => {
      return (
        <GoodItem
          key={index}
          id={good.id}
          img={good.picUrl}
          title={good.title}
          subtitle={good.subtitle}
          isPromotion={good.isPromotion}
          price={priceVisible ? good.price : null}
        >
          <Plus id={good.id} onClick={this.showSlide}/>
        </GoodItem>
      );
    });
    let Items = goods.length && goodItems;
    if (isLoading) {
      Items = [];
    } else if (goods.length) {
      Items = goodItems;
    } else {
      Items = <NoData text={'暂无数据'} img={noGoods} />;
    }
    return (
      <Container innerRef={cont => this.container = cont}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadData}
          hasMore={this.props.hasMore}
          loader={<Loading />}
          useWindow={false}
          >
        { Items }
        </InfiniteScroll>
      </Container>
    );
  }
}
