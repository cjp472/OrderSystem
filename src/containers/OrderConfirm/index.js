import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import LocationChoice from './LocationChoice';
import Navigate from 'components/Navigate';
import DeliveryDate from './DeliveryDate';
import Item from './Item';
import Message from './Message';
import TotalBar from 'containers/Cart/TotalBar';
import Load from 'components/Load';
import Load2 from 'components/Load2';
import CombineGoods from './CombineGoods';
import GiftGoods from './GiftGoods';
import OverlapGift from 'containers/Cart/OverlapGift';
import { getLocalData, setLocalData } from 'utils/localStorage';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { getCartGoods, getDefaultAddr, getAddrById, setDeliveryDate, setMessage, getSubmitParams, submitOrder, generateUniqueId } from 'redux/modules/orderConfirm';
import { dateValidate, isEmptyValue } from 'utils/validation';

const Root = styled.div`
  padding-top: 44px;
  padding-bottom: 64px;
  overflow: hidden;
`;

const Body = styled.div`
  background: #fff;
  margin-top: 10px;
`;

@connect(state => ({
  customer: state.orderConfirm.customer,
  deliveryDate: state.orderConfirm.deliveryDate,
  message: state.orderConfirm.message,
  priceVisible: state.orderConfirm.priceVisible,
  gifts: state.orderConfirm.gifts,
  items: state.orderConfirm.items,
  totalPrice: state.orderConfirm.totalPrice,
  addressId: state.orderConfirm.addressId,
  address: state.orderConfirm.address,
  name: state.orderConfirm.name,
  phone: state.orderConfirm.phone,
  tel: state.orderConfirm.tel,
  isLoading: state.orderConfirm.isLoading,
  isSubmit: state.orderConfirm.isSubmit,
  uuid: state.orderConfirm.uuid,
}), {
  getCartGoods,
  setDeliveryDate,
  setMessage,
  getDefaultAddr,
  getAddrById,
  submitOrder,
  pushState: push,
  goBack,
  generateUniqueId,
})
export default class OrderConfirm extends Component {
  static propTypes = {
    customer: PropTypes.string,
    priceVisible: PropTypes.bool,
    gifts: PropTypes.array,
    items: PropTypes.array,
    totalPrice: PropTypes.string,
    getCartGoods: PropTypes.func,
    getDefaultAddr: PropTypes.func,
    getAddrById: PropTypes.func,
    setDeliveryDate: PropTypes.func,
    setMessage: PropTypes.func,
    deliveryDate: PropTypes.string,
    message: PropTypes.string,
    addressId: PropTypes.string,
    address: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    tel: PropTypes.string,
    submitOrder: PropTypes.func,
    pushState: PropTypes.func,
    goBack: PropTypes.func,
    isLoading: PropTypes.bool,
    isSubmit: PropTypes.bool,
    uuid: PropTypes.string,
    generateUniqueId: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const ids = getLocalData('cart', 'submitIds');
    const params = {
      selected_cart_item_ids: ids
    };
    this.props.getCartGoods(params).then((result) => {
      if (result.code !== '1') {
        alert('商品请求失败，请稍后重试');
      }
    });
    const { id } = this.props.params; // eslint-disable-line
    if (id) {
      this.props.getAddrById({id: id}).then((result) => {
        if (result.code !== '1') {
          alert('地址请求失败，请稍后重试');
        }
      });
      setLocalData('orderConfirm', {});
    } else {
      this.props.getDefaultAddr().then((result) => {
        if (result.code !== '1') {
          alert('地址请求失败，请稍后重试');
        }
      });
    }
    // 注册给客户端调用的返回事件
    window.addEventListener('onBackPress', this.props.goBack);
    this.props.generateUniqueId();
  }

  componentWillUnmount() {
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  getAddress = () => {
    const { deliveryDate, message, addressId = '' } = this.props;
    setLocalData('orderConfirm', {deliveryDate: deliveryDate, message: message});
    let href = '/vue/address/addrs';
    if (addressId) {
      href = href + `?addressId=${addressId}`;
    }
    // 选择地址
    location.replace(href);
  }

  dateChange = (value) => {
    this.props.setDeliveryDate(value);
  }

  messageChange = (value) => {
    this.props.setMessage(value);
  }

  submitOrder = () => {
    const { addressId, address, name, phone, tel, deliveryDate, gifts, message, items} = this.props;
    const info = {
      addressId,
      address,
      name,
      phone,
      tel,
      deliveryDate,
      message
    };
    if (isEmptyValue(address)) {
      alert('请选择收货地址！');
      return;
    }
    if (!dateValidate(deliveryDate)) {
      alert('请输入正确的交货日期！');
      return;
    }
    const params = getSubmitParams(info, gifts, items);
    const uuid = this.props.uuid;
    this.props.submitOrder(params, uuid).then(result => {
      if (result.code === '1') {
        setLocalData('cart', {submitIds: []});
        this.props.pushState('/_react_/cart/success');
      } else {
        alert('提交订单失败，请稍后重试');
      }
    });
  }

  render() {
    const { customer, gifts, items, totalPrice, priceVisible, deliveryDate, message, name, phone, address, isLoading, isSubmit } = this.props;
    const Goods = items && items.map((item, index) => {
      if (item.type === '1') {
        return (
          <Item
            key={index}
            type={item.type}
            priceVisible={priceVisible}
            {...item.product}
          />
        );
      } else if (item.type === '2') {
        return (
          <CombineGoods key={index} priceVisible={priceVisible} item={item}/>
        );
      } else if (item.type === '3') {
        return (
          <GiftGoods key={index} priceVisible={priceVisible} item={item}/>
        );
      }
    });
    const Gifts = gifts && gifts.map((gift) => {
      return <OverlapGift key={gift.id} gift={gift} noHref />;
    });
    return (
      <Root>
        <Navigate title="进货单确认"/>
        {!isLoading && <LocationChoice customer={customer} name={name} phone={phone} address={address} getAddress={this.getAddress}/>}
        {!isLoading && <DeliveryDate onChange={this.dateChange} value={deliveryDate} />}
        {!isLoading && <Body>
            { Goods }
            { Gifts }
          </Body>}
        {!isLoading && <Message label={'留言：'} placeholder={'输入留言'} onChange={this.messageChange} value={message} />}
        {!isLoading && <TotalBar noCheck submitOrder={this.submitOrder} price={priceVisible ? totalPrice : null} label="提交"/>}
        {isLoading && <Load />}
        {isSubmit && <Load2 text="提交中..." />}
      </Root>
    );
  }
}
