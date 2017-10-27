import React, { Component, PropTypes } from 'react';
import Navigate from 'components/Navigate';
import styled from 'styled-components';
import Attributes from '../Order/Attributes';
import Location from './Location';
import Company from './Company';
import Goods from './Goods';
import Gifts from './Gifts';
import Price from './Price';
import Order from './Order';
import Message from './Message';
import BtnGroup from './BtnGroup';
import Toast from 'components/Toast';
import Load from 'components/Load';
import Btn from './Btn';
import DeliverLog from './DeliverLog';
import { connect } from 'react-redux';
import { push, goBack, replace } from 'react-router-redux';
import { getOrderDetail, cancelOrder, confirmOrder, buyAgain } from 'redux/modules/orderDetail';
import { setLocalData } from 'utils/localStorage';
import store from 'components/icons/store.png';
import { setBackEnable } from 'utils/WqJsBridge';

const Root = styled.div`
  padding-top: 54px;
  overflow-x: hidden;
  margin-bottom: 10px;
`;

@connect(state => ({
  statusAttrs: state.orderDetail.statusAttrs, // 订单状态, 交货日期
  priceVisible: state.orderDetail.priceVisible,
  customerId: state.orderDetail.customerId, // 客户ID
  customer: state.orderDetail.customer, // 客户名称
  locationAttrs: state.orderDetail.locationAttrs, // 联系人
  supplierId: state.orderDetail.supplierId, // 供货商ID
  supplier: state.orderDetail.supplier, // 供货商名称
  amount: state.orderDetail.amount, // 订单总金额
  remark: state.orderDetail.remark, // 买家留言
  reason: state.orderDetail.reason, // 审批意见
  operationAttrs: state.orderDetail.operationAttrs, // 订单操作明细
  hasRecord: state.orderDetail.hasRecord,
  gifts: state.orderDetail.gifts,
  products: state.orderDetail.products,
  isConfirm: state.orderDetail.isConfirm,
  isCancel: state.orderDetail.isCancel,
  isDelivered: state.orderDetail.isDelivered,
  isBuyAgain: state.orderDetail.isBuyAgain,
  isLoading: state.orderDetail.isLoading,
  cartIds: state.orderDetail.cartIds,
}), {
  getOrderDetail,
  cancelOrder,
  confirmOrder,
  buyAgain,
  pushState: push,
  goBack,
  replace
})

export default class Detail extends Component {
  static propTypes = {
    statusAttrs: PropTypes.array,
    priceVisible: PropTypes.bool,
    customerId: PropTypes.string,
    customer: PropTypes.string,
    locationAttrs: PropTypes.array,
    supplierId: PropTypes.string,
    supplier: PropTypes.string,
    amount: PropTypes.array,
    remark: PropTypes.string,
    reason: PropTypes.string,
    operationAttrs: PropTypes.array,
    hasRecord: PropTypes.bool,
    getOrderDetail: PropTypes.func,
    gifts: PropTypes.array,
    products: PropTypes.array,
    isConfirm: PropTypes.bool,
    isCancel: PropTypes.bool,
    isDelivered: PropTypes.bool,
    isBuyAgain: PropTypes.bool,
    cancelOrder: PropTypes.func,
    confirmOrder: PropTypes.func,
    isLoading: PropTypes.bool,
    pushState: PropTypes.func,
    buyAgain: PropTypes.func,
    cartIds: PropTypes.array,
    goBack: PropTypes.func,
    replace: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      toastShow: false
    };
  }

  componentDidMount() {
    if (window._react_page_action === 'POP') {
      return;
    }
    const { type, orderId, tenantId, customerId, supplierId } = this.props.params; // eslint-disable-line
    const params = {
      em_order_type: type,
      order_id: orderId,
      tenant_id: tenantId,
      customer_id: customerId,
      supplier_id: supplierId
    };
    this.props.getOrderDetail(params).then((result) => {
      if (result.code !== '1') {
        alert('订单详情请求失败，请稍后重试');
      }
    });
    // 注册给客户端调用的返回事件
    try {
      setBackEnable(true);
    } catch (error) {
      console.log(error);
    }
    window.addEventListener('onBackPress', this.props.goBack);
  }

  componentWillUnmount() {
    try {
      setBackEnable(false);
    } catch (error) {
      console.log(error);
    }
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  cancelOrder = () => {
    if (confirm('确认取消订单么？')) {
      const { type, orderId, tenantId } = this.props.params; // eslint-disable-line
      const { customerId } = this.props;
      const params = {
        em_order_type: type,
        order_id: orderId,
        tenant_id: tenantId,
        customer_id: customerId
      };
      this.props.cancelOrder(params).then((result) => {
        if (result.code === '1') {
          this.props.getOrderDetail(params).then((result2) => {
            if (result2.code !== '1') {
              alert('订单详情请求失败，请稍后重试');
            }
          });
        } else {
          alert('取消订单失败，请稍后重试');
        }
      });
    }
  }

  confirmOrder = () => {
    const { type, orderId, tenantId } = this.props.params; // eslint-disable-line
    const { customerId } = this.props;
    const params = {
      em_order_type: type,
      order_id: orderId,
      tenant_id: tenantId,
      customer_id: customerId
    };
    this.props.confirmOrder(params).then((result) => {
      if (result.code === '1') {
        this.setState({toastShow: true});
        setTimeout(() => {
          this.setState({toastShow: false});
          this.props.getOrderDetail(params).then((result2) => {
            if (result2.code !== '1') {
              alert('订单详情请求失败，请稍后重试');
            }
          });
        }, 300);
      } else {
        alert('确认订单失败，请稍后重试');
      }
    });
  }

  goDelivery = () => {
    const { type, orderId, tenantId } = this.props.params; // eslint-disable-line
    this.props.pushState(`/_react_/delivery/list/${type}/${orderId}/${tenantId}`);
  }

  // 确认签收
  signConfirm = () => {
    const { type, orderId, tenantId } = this.props.params; // eslint-disable-line
    const { customerId, supplierId } = this.props;
    if (type === 'PSI') { // 去评价
      // this.props.pushState(`/_react_/comment/detail/${type}/${orderId}/${tenantId}/${customerId}`);
      this.props.replace(`/_react_/comment/detail/${type}/${orderId}/${tenantId}/${customerId}/${supplierId}`);
      return;
    }
    // 签收
    this.props.replace(`/_react_/stock/confirm/${type}/${orderId}/${tenantId}/${customerId}/${supplierId}`);
  }

  // 再次购买
  buyAgain = () => {
    const { type, orderId, tenantId } = this.props.params; // eslint-disable-line
    const { customerId, supplierId } = this.props;
    const params = {
      customer_id: customerId,
      em_order_type: type,
      order_id: orderId,
      supplier_id: supplierId,
      tenant_id: tenantId
    };
    this.props.buyAgain(params).then((result) => {
      if (result.code === '1') {
        setLocalData('orderDetail', {cartIds: this.props.cartIds});
        this.props.pushState(`/_react_/cart?isBuyAgain=1`);
      } else {
        alert('再次购买请求失败，请稍后重试');
      }
    });
  }

  render() {
    const { statusAttrs, customer, priceVisible, locationAttrs, supplier, amount,
      remark, reason, operationAttrs, hasRecord, products, gifts,
      isConfirm, isCancel, isDelivered, isBuyAgain, isLoading
    } = this.props;
    const { toastShow } = this.state;
    let Item = null;
    if (!isLoading) {
      Item = (
        <Root>
          <Navigate title="进货单详情"/>
          <Attributes items={statusAttrs} />
          <Location icon={store} name={customer} items={locationAttrs} />
          <Company name={supplier} />
          <Goods products={products} priceVisible={priceVisible} />
          <Gifts gifts={gifts} />
          {priceVisible && <Price items={amount} />}
          {remark && <Message message={remark} label={'买家留言'}/>}
          {reason && <Message message={reason} label={'审批意见'}/>}
          <Order items={operationAttrs} signConfirm={this.signConfirm} buyAgain={this.buyAgain} isDelivered={isDelivered} isBuyAgain={isBuyAgain} />
          { hasRecord && <DeliverLog goDelivery={this.goDelivery}/> }
          <BtnGroup show={ isCancel || isConfirm } >
            <Btn show={isCancel} onClick={this.cancelOrder}>取消订单</Btn>
            <Btn show={isConfirm} onClick={this.confirmOrder}>确认订单</Btn>
          </BtnGroup>
          <Toast show={toastShow} title={'确认订单成功'} />
        </Root>
      );
    } else {
      Item = <Load />;
    }
    return (
      Item
    );
  }
}
