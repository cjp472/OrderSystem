// 获取商品类型服务端请求
const GET_SENT_RECORDS = 'delivery/GET_SENT_RECORDS';
const GET_SENT_RECORDS_SUCCESS = 'delivery/GET_SENT_RECORDS_SUCCESS';
const GET_SENT_RECORDS_FAILURE = 'delivery/GET_SENT_RECORDS_FAILURE';
// 隐藏显示商品清单
const CHANGE_RECORD_STATUS = 'delivery/CHANGE_RECORD_STATUS';

const initial = {
  sentRecords: [], // 发货单列表
  isLoading: true, // 加载中...
};

const getSignCount = (stocks) => {
  let stockCount = '';
  const count = {};
  stocks.forEach((stock) => {
    const keys = Object.keys(count);
    if (keys.includes(stock.sent_input_unit_name)) {
      count[stock.sent_input_unit_name] = count[stock.sent_input_unit_name] + stock.sent_num;
    } else {
      count[stock.sent_input_unit_name] = stock.sent_num;
    }
  });
  const countKeys = Object.keys(count);
  countKeys.forEach((countKey) => {
    stockCount = stockCount + count[countKey] + countKey;
  });
  return stockCount;
};

const convertStocks = (stocks) => {
  return stocks && stocks.map(stock => {
    return {
      isGift: stock.is_gift === '1' ? true : false,
      id: stock.pd_id,
      title: stock.pd_name,
      subtitle: stock.spec,
      sentNum: stock.sent_num + stock.sent_input_unit_name,
      signNum: stock.sign_num + stock.sign_input_unit_name,
      picUrl: stock.small_pic,
    };
  });
};

const convertRecords = (data) => {
  return data && data.map((record) => {
    return {
      id: record.sent_id,
      items: [
        {
          name: '发货单号',
          value: record.sent_no
        },
        {
          name: '发货时间',
          value: record.sent_time
        }
      ],
      isClosed: false,
      total: '共' + getSignCount(record.sent_records),
      stocks: convertStocks(record.sent_records),
    };
  });
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_SENT_RECORDS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SENT_RECORDS_SUCCESS:
      const data = action.result.data;
      return {
        ...state,
        isLoading: false,
        sentRecords: convertRecords(data)
      };
    case GET_SENT_RECORDS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case CHANGE_RECORD_STATUS:
      return {
        ...state,
        sentRecords: action.sentRecords
      };
    default:
      return state;
  }
}

/**
 * 获取订单关联的发货单
 */
export function getSentRecords(params) {
  return {
    types: [GET_SENT_RECORDS, GET_SENT_RECORDS_SUCCESS, GET_SENT_RECORDS_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/getSentRecords.action`, {
      data: params
    })
  };
}

/**
 * 隐藏商品清单
 */
export function changeRecordStatus(id) {
  return (dispatch, getState) => {
    const records = getState().delivery.sentRecords.slice().map((record) => {
      if (record.id === id) {
        return {
          ...record,
          isClosed: !record.isClosed
        };
      }
      return record;
    });
    dispatch({
      type: CHANGE_RECORD_STATUS,
      sentRecords: records
    });
  };
}


