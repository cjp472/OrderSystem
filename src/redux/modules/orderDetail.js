// 获取商品类型服务端请求
const GET_ORDER_DETAIL = 'orderDetail/GET_ORDER_DETAIL';
const GET_ORDER_DETAIL_SUCCESS = 'orderDetail/GET_ORDER_DETAIL_SUCCESS';
const GET_ORDER_DETAIL_FAILURE = 'orderDetail/GET_ORDER_DETAIL_FAILURE';

// 取消订单
const CANCEL_ORDER = 'orderDetail/CANCEL_ORDER';
const CANCEL_ORDER_SUCCESS = 'orderDetail/CANCEL_ORDER_SUCCESS';
const CANCEL_ORDER_FAILURE = 'orderDetail/CANCEL_ORDER_FAILURE';

// 确认订单
const CONFIRM_ORDER = 'orderDetail/CONFIRM_ORDER';
const CONFIRM_ORDER_SUCCESS = 'orderDetail/CONFIRM_ORDER_SUCCESS';
const CONFIRM_ORDER_FAILURE = 'orderDetail/CONFIRM_ORDER_FAILURE';

// 再次购买
const BUY_AGAIN = 'orderDetail/BUY_AGAIN';
const BUY_AGAIN_SUCCESS = 'orderDetail/BUY_AGAIN_SUCCESS';
const BUY_AGAIN_FAILURE = 'orderDetail/BUY_AGAIN_FAILURE';

const initial = {
  priceVisible: true,
  statusAttrs: [], // 订单状态, 交货日期
  customerId: '', // 客户ID
  customer: '', // 客户名称
  locationAttrs: [], // 联系人
  supplierId: '', // 供货商ID
  supplier: '', // 供货商名称
  amount: [], // 订单总金额
  remark: '', // 买家留言
  reason: '', // 审批意见
  operationAttrs: [], // 订单操作明细
  hasRecord: false, // 1:有发货记录 0：无发货记录
  gifts: [], // 赠品列表
  products: [],  // 普通商品列表
  isConfirm: false, // 确认订单
  isCancel: false, // 取消订单
  isDelivered: false, // 确认签收
  isBuyAgain: false, // 再次购买
  isLoading: false, // 正在加载
  cartIds: [], // 购物车记录ID
};

const convertPrice = (price) => {
  return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

const getStatusByCode = (code) => {
  const status = [
    {key: '1', value: '待确认'},
    {key: '2', value: '待发货'},
    {key: '3', value: '待签收'},
    {key: '4', value: '已完成'},
    {key: '5', value: '已取消'}
  ];
  const curStatus = status.filter((value) => {
    return value.key === code;
  })[0];
  return curStatus.value;
};

const getOperations = (operations) => {
  return operations.map((operation) => {
    return {
      name: operation.operate_label,
      value: operation.operate_time + ' ' + operation.operate_man
    };
  });
};

const convertProducts = (products) => {
  return products.map((product) => {
    return {
      title: product.pd_name,
      subtitle: product.spec,
      id: product.pd_id,
      price: product.price,
      picUrl: product.small_pic,
      info: product.item_count + product.unit_name
    };
  });
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_ORDER_DETAIL:
      return {
        ...state,
        priceVisible: true,
        statusAttrs: [], // 订单状态, 交货日期
        customerId: '', // 客户ID
        customer: '', // 客户名称
        locationAttrs: [], // 联系人
        supplierId: '', // 供货商ID
        supplier: '', // 供货商名称
        amount: [], // 订单总金额
        remark: '', // 买家留言
        reason: '', // 审批意见
        operationAttrs: [], // 订单操作明细
        hasRecord: false, // 1:有发货记录 0：无发货记录
        gifts: [], // 赠品列表
        products: [],  // 普通商品列表
        isConfirm: false, // 确认订单
        isCancel: false, // 取消订单
        isDelivered: false, // 确认签收
        isBuyAgain: false, // 再次购买
        isLoading: true, // 加载中
      };
    case GET_ORDER_DETAIL_SUCCESS:
      const data = action.result && action.result.data;
      const statusAttrs = [
        {
          name: '订单状态',
          value: `【${getStatusByCode(data.em_order_status)}】`
        },
        {
          name: '交货日期',
          value: data.consignment_date
        }
      ];
      const locationAttrs = [
        {
          name: '联系人',
          value: data.receive_name
        },
        {
          name: '联系电话',
          value: data.receive_phone
        },
        {
          name: '收货地址',
          value: data.receive_addr
        },
      ];
      const operations = getOperations(data.operation_details);
      const operationAttrs = [
        {
          name: '订单ID',
          value: data.order_id
        },
        ...operations
      ];
      return {
        ...state,
        statusAttrs,
        priceVisible: data.price_visible === '1',
        customerId: data.customer_id,
        customer: data.customer_name,
        locationAttrs,
        supplierId: data.supplier_id,
        supplier: data.supplier_name,
        amount: [{name: '订单金额', value: '¥' + convertPrice(data.order_amount), isPrice: true}],
        remark: data.remark,
        reason: data.confirm_reason,
        operationAttrs,
        hasRecord: data.has_sent_record === '1' ? true : false,
        products: convertProducts(data.order_detail.pds),
        gifts: convertProducts(data.order_detail.gifts),
        isConfirm: data.em_order_status === '1' && data.em_order_type === 'DMS_ZY',
        isCancel: ( data.em_order_status === '1' ) && (
          (data.em_order_type === 'DMS_ZY' && data.allow_cancel_zy_order === '1') ||
          (data.em_order_type === 'PSI' && data.emp_order === '0')
        ),
        isDelivered: data.em_order_status === '3',
        isBuyAgain: data.em_order_status === '4' && data.supplier_customer_selected === '1',
        isLoading: false,
      };
    case GET_ORDER_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case BUY_AGAIN:
      return {
        ...state
      };
    case BUY_AGAIN_SUCCESS:
      return {
        ...state,
        cartIds: action.result.data
      };
    default:
      return state;
  }
}

/**
 * 获取进货单详情
 */
export function getOrderDetail(params) {
  return {
    types: [GET_ORDER_DETAIL, GET_ORDER_DETAIL_SUCCESS, GET_ORDER_DETAIL_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/orderDetail.action`, {
      data: params
    })
  };
}

/**
 * 取消订单
 */
export function cancelOrder(params) {
  return {
    types: [CANCEL_ORDER, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/cancelOrder.action`, {
      data: params
    })
  };
}

/**
 * 确认订单
 */
export function confirmOrder(params) {
  return {
    types: [CONFIRM_ORDER, CONFIRM_ORDER_SUCCESS, CONFIRM_ORDER_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/confirmOrder.action`, {
      data: params
    })
  };
}

/**
 * 再次购买
 */
export function buyAgain(params) {
  return {
    types: [BUY_AGAIN, BUY_AGAIN_SUCCESS, BUY_AGAIN_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/buyAgain.action`, {
      data: params
    })
  };
}

