import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Shop from './Shop';
import Item from './Item';
import Head from 'components/Navigate';
import ClearBtn from './ClearBtn';
import DeleteBar from './DeleteBar';
import TotalBar from './TotalBar';
import GiftGoods from './GiftGoods';
import CombineGoods from './CombineGoods';
import OverlapGift from './OverlapGift';
import ExpiryGoods from './ExpiryGoods';
import NoData from 'components/NoData';
import Load from 'components/Load';
import noCart from 'components/icons/noCart.png';
import { showTab, hideTab } from 'utils/WqJsBridge';
import { setLocalData, getLocalData } from 'utils/localStorage';
import { push, goBack } from 'react-router-redux';
import { connect } from 'react-redux';
import { getCartGoods,
  checkChange,
  checkAllChange,
  checkAllDelete,
  countChange,
  countChangeReq,
  editChange,
  getDelIds,
  getExpiryIds,
  getSubmitIds,
  deleteGoods,
  buyAgain
} from 'redux/modules/cart';

const Channel = styled.div`
  color: #666666;
  font-size: 13px;
  line-height: 35px;
  padding-left: 10px;
`;

const Detail = styled.div`
  background: #fff;
`;

const Root = styled.div`
  padding-top: 44px;
`;

const Container = styled.div`
  margin-bottom: 50px;
`;

@connect(state => ({
  customer: state.cart.customer,
  supplier: state.cart.supplier,
  priceVisible: state.cart.priceVisible,
  gifts: state.cart.gifts,
  expiryItems: state.cart.expiryItems,
  items: state.cart.items,
  total: state.cart.total,
  totalPrice: state.cart.totalPrice,
  checkAll: state.cart.checkAll,
  checkAllDel: state.cart.checkAllDel,
  isEdit: state.cart.isEdit,
  title: state.cart.title,
  isLoading: state.cart.isLoading,
}), {
  getCartGoods,
  checkChange,
  checkAllChange,
  countChange,
  countChangeReq,
  editChange,
  deleteGoods,
  checkAllDelete,
  buyAgain,
  pushState: push,
  goBack
})
export default class Cart extends Component {
  static propTypes = {
    getCartGoods: PropTypes.func,
    customer: PropTypes.string,
    supplier: PropTypes.string,
    priceVisible: PropTypes.bool,
    gifts: PropTypes.array,
    items: PropTypes.array,
    expiryItems: PropTypes.array,
    total: PropTypes.number,
    totalPrice: PropTypes.string,
    checkAll: PropTypes.bool,
    checkAllDel: PropTypes.bool,
    checkChange: PropTypes.func,
    checkAllChange: PropTypes.func,
    checkAllDelete: PropTypes.func,
    countChange: PropTypes.func,
    countChangeReq: PropTypes.func,
    editChange: PropTypes.func,
    isEdit: PropTypes.bool,
    deleteGoods: PropTypes.func,
    submitOrder: PropTypes.func,
    pushState: PropTypes.func,
    buyAgain: PropTypes.func,
    title: PropTypes.string,
    goBack: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { isFromApp } = this.props.location.query; // eslint-disable-line
    const { isBuyAgain } = this.props.location.query; // eslint-disable-line
    if ( isFromApp === '1') { // 如果是原生页面进入，返回时需要显示Tab
      if (/(Android)/i.test(navigator.userAgent)) { // android手机需要对象存在才能调用方法
        if (window.WebViewJavascriptBridge) {
          showTab();
        } else {
          document.addEventListener('WebViewJavascriptBridgeReady', () => {
            showTab();
          });
        }
      } else { // IOS直接调用
        showTab();
      }
    }
    const params = {
      selected_cart_item_ids: []
    };
    this.props.getCartGoods(params).then((result) => {
      if (result.code === '1' && isBuyAgain === '1') {
        const cartIds = getLocalData('orderDetail', 'cartIds');
        this.props.buyAgain(cartIds);
      }
      if (result.code !== '1') {
        alert('商品请求失败，请稍后重试');
      }
    });
    window.addEventListener('getCartGoodsByApp', this.initCartGoods);
    // 注册给客户端调用的返回事件
    window.addEventListener('onBackPress', this.props.goBack);
  }

  componentWillUnmount() {
    window.removeEventListener('getCartGoodsByApp', this.initCartGoods);
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  initCartGoods = () => {
    const params = {
      selected_cart_item_ids: []
    };
    this.props.getCartGoods(params).then((result) => {
      if (result.code !== '1') {
        alert('商品请求失败，请稍后重试');
      }
    });
  }

  countChange = (value, id, cartId, type) => {
    this.props.countChange(value, cartId);
    const params = {
      id: cartId,
      item_count: value,
      item_type: type
    };
    this.props.countChangeReq(params).then((result) => {
      if (result.code !== '1') {
        alert('商品请求失败，请稍后重试');
      }
    });
  }

  checkChange = (checked, id) => {
    this.props.checkChange(checked, id);
  }

  checkAllChange = (checked) => {
    this.props.checkAllChange(checked);
  }

  checkAllDelete = (checked) => {
    this.props.checkAllDelete(checked);
  }

  rightClick = () => {
    const { isEdit } = this.props;
    this.props.editChange(!isEdit);
  }

  deleteGoods = () => {
    const { items } = this.props;
    const ids = getDelIds(items);
    if (ids.length === 0) {
      alert('未勾选任何商品');
      return;
    }
    if (confirm('确认删除选中商品吗？')) {
      const params = {
        delete_cart_item_ids: ids
      };
      this.props.deleteGoods(params).then((result) => {
        if (result.code === '1') {
          const cartParams = {
            selected_cart_item_ids: []
          };
          this.props.getCartGoods(cartParams);
        } else {
          alert('删除商品出错，请稍后重试');
        }
      });
    }
  }

  clearExpiryGoods = () => {
    const { expiryItems } = this.props;
    const ids = getExpiryIds(expiryItems);
    const params = {
      delete_cart_item_ids: ids
    };
    this.props.deleteGoods(params).then((result) => {
      if (result.code === '1') {
        const cartParams = {
          selected_cart_item_ids: []
        };
        this.props.getCartGoods(cartParams);
      } else {
        alert('删除商品出错，请稍后重试');
      }
    });
  }

  submitOrder = () => {
    const { items } = this.props;
    const ids = getSubmitIds(items);
    if (ids.length === 0) {
      alert('请先选择要购买的商品！');
      return;
    }
    setLocalData('cart', {submitIds: ids});
    try {
      hideTab();
    } catch (error) {
      console.log(error);
    }
    this.props.pushState('/_react_/cart/confirm');
  }

  render() {
    const { customer, supplier, items, gifts, expiryItems, total, totalPrice, checkAll, checkAllDel, isEdit, priceVisible, title, isLoading } = this.props;
    const { isFromApp } = this.props.location.query; // eslint-disable-line
    const Goods = items.map((item, index) => {
      if (item.type === '1') {
        return (
          <Item
            isEdit={isEdit}
            key={index}
            type={item.type}
            priceVisible={priceVisible}
            {...item.product}
            countChange={this.countChange}
            checkChange={this.checkChange}
          />
        );
      } else if (item.type === '2') {
        return (
          <CombineGoods key={index} priceVisible={priceVisible} isEdit={isEdit} item={item} checkChange={this.checkChange} countChange={this.countChange} />
        );
      } else if (item.type === '3') {
        return (
          <GiftGoods key={index} priceVisible={priceVisible} isEdit={isEdit} item={item} checkChange={this.checkChange} countChange={this.countChange}/>
        );
      }
    });
    const Gifts = gifts.map((gift) => {
      return <OverlapGift key={gift.id} gift={gift} />;
    });
    const menu = isEdit ? '完成' : '编辑';
    return (
      <Root>
        <Head title={title} canBack={isFromApp !== '1'} menu={menu} rightClick={this.rightClick}/>
        {!isLoading && <Container>
          <Channel>{customer}</Channel>
          {supplier && <Shop title={supplier} />}
          <Detail>
            { Goods }
            { Gifts }
            { <ExpiryGoods items={expiryItems}/> }
          </Detail>
          { expiryItems.length ? <ClearBtn clearExpiryGoods={this.clearExpiryGoods} /> : null }
        </Container>}
        {!isLoading && !items.length && !expiryItems.length && <NoData text={'购物车空空如也'} img={noCart} />}
        {!isLoading && !!items.length && isEdit && <DeleteBar deleteGoods={this.deleteGoods} checkAllChange={this.checkAllDelete} checked={checkAllDel} />}
        {!isLoading && !!items.length && !isEdit && <TotalBar submitOrder={this.submitOrder} checkAllChange={this.checkAllChange} checked={checkAll} price={priceVisible ? totalPrice : null} label={`下单(${total})`} />}
        {isLoading && <Load />}
      </Root>
    );
  }
}
