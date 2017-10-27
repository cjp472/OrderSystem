// 获取商品类型服务端请求
const GET_ORDERS = 'order/GET_ORDERS';
const GET_ORDERS_SUCCESS = 'order/GET_ORDERS_SUCCESS';
const GET_ORDERS_FAILURE = 'order/GET_ORDERS_FAILURE';

// tab修改
const NAV_CHANGE = 'order/NAV_CHANGE';

// 初始化NAV类型
const INIT_NAV_TYPE = 'order/INIT_NAV_TYPE';

// 初始化请求数据
const INIT_DATA = 'order/INIT_DATA';

const initial = {
  hasMore: false,
  isLoading: true,
  orders: [],
  page: 1,
  rows: 20,
  orderStatus: [
    {
      code: '',
      value: '全部',
      selected: true
    },
    {
      code: '1',
      value: '待确认',
      color: '#39ABF2',
      selected: false
    },
    {
      code: '2',
      value: '待发货',
      color: '#8D7BF7',
      selected: false
    },
    {
      code: '3',
      value: '待签收',
      color: '#FFBA00',
      selected: false
    },
    {
      code: '4',
      value: '已完成',
      color: '#6FD03A',
      selected: false
    },
    {
      code: '5',
      value: '已取消',
      color: '#FF7485',
      selected: false
    },
  ],
  currentStatus: ''
};

const convertPrice = (price) => {
  return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

const resetOrderStatus = (orderStatus, code) => {
  return orderStatus && orderStatus.map((data) => {
    return {
      code: data.code,
      value: data.value,
      color: data.color,
      selected: data.code === code
    };
  });
};

const convertDetails = (details) => {
  const imgs = [];
  if (details.length > 1) {
    details.forEach((detail) => {
      imgs.push(detail.small_pic);
    });
    return imgs;
  } else if (details.length === 1) {
    return {
      title: details[0].pd_name,
      subtitle: details[0].spec,
      picUrl: details[0].small_pic
    };
  }
  return null;
};

const getStatus = (statusArr, code) => {
  return statusArr.filter((status) => {
    return status.code === code;
  })[0];
};

const getCurrentStatus = (statusArr) => {
  return statusArr.filter((status) => {
    return status.selected;
  })[0];
};

const convertOrders = (orders, statusArr) => {
  return orders && orders.map((order) => {
    return {
      status: order.em_order_status,
      color: getStatus(statusArr, order.em_order_status).color,
      statusName: getStatus(statusArr, order.em_order_status).value,
      title: '订单ID：' + order.order_id,
      type: order.em_order_type,
      orderId: order.order_id,
      tenantId: order.tenant_id,
      customerId: order.customer_id,
      supplierId: order.supplier_id,
      items: [
        {
          name: '客户',
          value: order.customer_name
        },
        {
          name: '供货商',
          value: order.supplier_name
        },
        {
          name: '金额',
          isPrice: true,
          value: order.price_visible === '1' ? '¥' + convertPrice(order.order_amount) : null
        }
      ],
      picLength: order.details.length,
      detail: convertDetails(order.details)
    };
  });
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        isLoading: state.page === 1 ? true : false
      };
    case GET_ORDERS_SUCCESS:
      let hasMore = true;
      const data = action && action.result && action.result.data;
      let orders = [];
      if (data.length < 20) hasMore = false;
      if (state.page === 1) {
        orders = convertOrders(data, [...state.orderStatus]);
      } else {
        orders = state.orders.slice().concat(convertOrders(data, [...state.orderStatus]));
      }
      return {
        ...state,
        currentStatus: getCurrentStatus([...state.orderStatus]).code,
        page: state.page + 1,
        orders,
        hasMore,
        isLoading: false
      };
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case NAV_CHANGE:
      const orderStatus = resetOrderStatus([...state.orderStatus], action.code);
      return {
        ...state,
        currentStatus: getCurrentStatus(orderStatus).code,
        orderStatus,
        page: 1,
        hasMore: false
      };
    case INIT_NAV_TYPE:
      const newOrderStatus = resetOrderStatus([...state.orderStatus], action.code);
      return {
        ...state,
        currentStatus: getCurrentStatus(newOrderStatus).code,
        orderStatus: newOrderStatus
      };
    case INIT_DATA:
      return {
        ...state,
        hasMore: false,
        isLoading: true,
        orders: [],
        page: 1,
      };
    default:
      return state;
  }
}

/**
 * 获取进货单详情
 */
export function getOrders(params) {
  return {
    types: [GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/listOrders.action`, {
      data: params
    })
  };
}

/**
 * tab切换
 */
export function navChange(code) {
  return dispatch => {
    dispatch({
      type: NAV_CHANGE,
      code
    });
  };
}

/**
 * 当前Tab类型
 */
export function initNavType(code) {
  return dispatch => {
    dispatch({
      type: INIT_NAV_TYPE,
      code
    });
  };
}

/**
 * 初始化请求数据
 */
export function initData() {
  return dispatch => {
    dispatch({
      type: INIT_DATA
    });
  };
}

