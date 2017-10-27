import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import Main from './Main';
import Search from './Search';
import Slide from 'containers/Slide';
import Toast from 'components/Toast';
import Load from 'components/Load';
import { connect } from 'react-redux';
import { initSlide,
  showSlide,
  hideSlide,
  getCurrGood,
  countChange,
  unitChange,
  addInCart,
  getTypes,
  getGoods,
  selectGoods,
  selectSubGoods,
  initData
} from 'redux/modules/goods';
import { getImageUrl } from 'utils/utils';
import { setLocalData } from 'utils/localStorage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
`;

@connect(state => ({
  slideShow: state.goods.slideShow,
  xDis: state.goods.xDis,
  good: state.goods.good,
  types: state.goods.types,
  goods: state.goods.goods,
  page: state.goods.page,
  rows: state.goods.rows,
  currentType: state.goods.currentType,
  hasMore: state.goods.hasMore,
  priceVisible: state.goods.priceVisible,
  isLoading: state.goods.isLoading,
}), {
  initSlide,
  showSlide,
  hideSlide,
  getCurrGood,
  countChange,
  unitChange,
  addInCart,
  getTypes,
  getGoods,
  selectGoods,
  selectSubGoods,
  initData
})

export default class Goods extends Component {
  static propTypes = {
    slideShow: PropTypes.bool,
    xDis: PropTypes.number,
    good: PropTypes.object,
    initSlide: PropTypes.func,
    showSlide: PropTypes.func,
    hideSlide: PropTypes.func,
    getCurrGood: PropTypes.func,
    countChange: PropTypes.func,
    unitChange: PropTypes.func,
    addInCart: PropTypes.func,
    getTypes: PropTypes.func,
    types: PropTypes.array,
    getGoods: PropTypes.func,
    goods: PropTypes.array,
    page: PropTypes.number,
    rows: PropTypes.number,
    currentType: PropTypes.string,
    hasMore: PropTypes.bool,
    priceVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    selectGoods: PropTypes.func,
    selectSubGoods: PropTypes.func,
    initData: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      toastShow: false,
      prefix: ''
    };
  }

  componentWillMount() {
    getImageUrl(prefix => {
      setLocalData('goods', {'imageUrl': prefix});
    });
  }

  componentDidMount() {
    // 查询商品类型
    this.props.getTypes().then((result) => {
      if (result.code === '1') {
        this.getGoods();
      } else {
        alert('商品类型请求失败，请稍后重试');
      }
    });
    window.addEventListener('getGoodsByApp', this.initGoods);
  }

  componentWillUnmount() {
    window.removeEventListener('getGoodsByApp', this.initGoods);
  }

  getGoods = () => {
    const params = {
      page: this.props.page,
      rows: this.props.rows,
      class_id: this.props.currentType
    };
    this.props.getGoods(params).then((result) => {
      if (result.code !== '1') {
        alert('商品请求失败，请稍后重试');
      }
    });
  }

  initGoods = () => {
    this.props.getTypes().then((result) => {
      if (result.code === '1') {
        const params = {
          page: 1,
          rows: this.props.rows,
          class_id: '-1'
        };
        this.props.getGoods(params).then((result2) => {
          if (result2.code !== '1') {
            alert('商品请求失败，请稍后重试');
          }
        });
        this.props.initData(1, '-1');
      } else {
        alert('商品类型请求失败，请稍后重试');
      }
    });
  }

  selectGoods = (id, hasChildren, open, active) => {
    // 无子节点 但是选中状态 不做任何处理
    if (active && !hasChildren ) return;
    this.props.selectGoods(id, open);
    // 有子节点并且是打开状态，不发请求
    if (hasChildren && open) return;
    setTimeout(() => {
      const params = {
        page: this.props.page,
        rows: this.props.rows,
        class_id: this.props.currentType
      };
      this.props.getGoods(params);
    }, 0);
  }

  selectSubGoods = (id, subId, active) => {
    if (active) return;
    this.props.selectSubGoods(id, subId);
    setTimeout(() => {
      const params = {
        page: this.props.page,
        rows: this.props.rows,
        class_id: this.props.currentType
      };
      this.props.getGoods(params);
    }, 0);
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

  showSlideEvent = (id) => {
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
  }

  render() {
    const { slideShow, xDis, good, types, goods, page, rows, currentType, hasMore, priceVisible, isLoading } = this.props;
    const { toastShow } = this.state;
    const pageFrom = 'list'; // list 列表  detail 详情
    return (
      <Container>
        <Search/>
        <Body>
          <Menu types={types} selectGoods={this.selectGoods} selectSubGoods={this.selectSubGoods} />
          <Main
            showSlide={this.showSlideEvent}
            goods={goods}
            page={page}
            rows={rows}
            currentType={currentType}
            hasMore={hasMore}
            priceVisible={priceVisible}
            isLoading={isLoading}
            getGoods={this.getGoods}
          />
        </Body>
        <Slide
          pageFrom={pageFrom}
          xDis={xDis}
          good={good}
          priceVisible={priceVisible}
          show={slideShow}
          hideSlide={this.hideSlideEvent}
          countChange={this.props.countChange}
          unitChange={this.props.unitChange}
          addInCart={this.addInCart}
        />
        <Toast show={toastShow} title={'加入购物车成功'} />
        {isLoading && <Load />}
      </Container>
    );
  }
}
