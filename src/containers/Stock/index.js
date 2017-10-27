import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Navigate from 'components/Navigate';
import Card from './Card';
import Load from 'components/Load';
import Toast from 'components/Toast';
import { connect } from 'react-redux';
import { push, goBack, replace } from 'react-router-redux';
import { getSentRecords, countChange, getSubmitRecords, confirmSign } from 'redux/modules/stock';
import { setLocalData } from 'utils/localStorage';


const Root = styled.div`
  padding-top: 44px;
`;

@connect(state => ({
  sentRecords: state.stock.sentRecords,
  needComment: state.stock.needComment,
  isLoading: state.stock.isLoading,
}), {
  getSentRecords,
  countChange,
  confirmSign,
  pushState: push,
  goBack,
  replace,
})
export default class Stock extends Component {
  static propTypes = {
    sentRecords: PropTypes.array,
    needComment: PropTypes.bool,
    getSentRecords: PropTypes.func,
    countChange: PropTypes.func,
    confirmSign: PropTypes.func,
    pushState: PropTypes.func,
    goBack: PropTypes.func,
    replace: PropTypes.func,
    isLoading: PropTypes.bool,
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
    const { type, orderId, tenantId } = this.props.params; //eslint-disable-line
    const params = {
      em_order_type: type,
      order_id: orderId,
      tenant_id: tenantId
    };
    this.props.getSentRecords(params).then((result) => {
      if (result.code !== '1') {
        alert('数据请求失败，请稍后重试');
      }
    });
    // 注册给客户端调用的返回事件
    window.addEventListener('onBackPress', this.props.goBack);
  }

  componentWillUnmount() {
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  onConfirm = (id, storeId) => { // id: 发货单id  storeId: 签收仓库id
    const { type, orderId, tenantId, customerId, supplierId } = this.props.params; //eslint-disable-line
    const { sentRecords, needComment } = this.props;
    const stocks = getSubmitRecords(sentRecords, id);
    const params = {
      em_order_type: type,
      order_id: orderId,
      customer_id: customerId,
      sent_id: id,
      sign_record_details: stocks,
      store_house_id: storeId,
      tenant_id: tenantId
    };
    // 如果需要评价
    if (needComment) {
      setLocalData('stock', {signData: params});
      this.props.replace(`/_react_/comment/detail/${type}/${orderId}/${tenantId}/${customerId}/${supplierId}`);
      return;
    }
    // 不需要评价
    this.props.confirmSign(params).then(result => {// 确认成功后再请求数据
      if (result.code === '1') {
        this.setState({toastShow: true});
        setTimeout(() => {
          this.setState({toastShow: false});
          const recordParams = {
            em_order_type: type,
            order_id: orderId,
            tenant_id: tenantId
          };
          this.props.getSentRecords(recordParams).then((result2) => {
            if (result2.code !== '1') {
              alert('数据请求失败，请稍后重试');
            }
          });
        }, 300);
      } else {
        alert('确认失败，请稍后重试');
      }
    });
  }

  countChange = (value, id, recordId) => {
    this.props.countChange(value, id, recordId);
  }

  render() {
    const { sentRecords, isLoading } = this.props;
    const { toastShow } = this.state;
    return (
      <Root>
        <Navigate title="签收入库"/>
        { sentRecords && sentRecords.map((sentRecord, index) => (
          <Card record={sentRecord} key={index} countChange={this.countChange} onConfirm={this.onConfirm} />
        ))}
        { isLoading && <Load />}
        <Toast show={toastShow} title={'提交成功'} />
      </Root>
    );
  }
}
