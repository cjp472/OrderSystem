import cloneDeep from 'lodash.clonedeep';
// 获取商品类型服务端请求
const GET_SENT_RECORDS = 'stock/GET_SENT_RECORDS';
const GET_SENT_RECORDS_SUCCESS = 'stock/GET_SENT_RECORDS_SUCCESS';
const GET_SENT_RECORDS_FAILURE = 'stock/GET_SENT_RECORDS_FAILURE';

// 修改签收数量
const COUNT_CHANGE = 'stock/COUNT_CHANGE';

// 获取仓库列表
const GET_STORE_HOUSES = 'stock/GET_STORE_HOUSES';

// 选择仓库
const ON_SELECT_HOUSE = 'stock/ON_SELECT_HOUSE';

// 确认签收
const CONFIRM_SIGN = 'stock/CONFIRM_SIGN';
const CONFIRM_SIGN_SUCCESS = 'stock/CONFIRM_SIGN_SUCCESS';
const CONFIRM_SIGN_FAILURE = 'stock/CONFIRM_SIGN_FAILURE';

const initial = {
  sentRecords: [], // 发货单列表
  isLoading: true, // 加载中...
  storeHouses: [], // 当前选中的仓库列表
  needComment: false // 是否需要评价
};

const convertStocks = (stocks, signStatus) => {
  return stocks && stocks.map(stock => {
    return {
      isGift: stock.is_gift === '1' ? true : false,
      id: stock.sent_detail_id,
      title: stock.pd_name,
      subtitle: stock.spec,
      unitId: stock.sent_input_unit,
      unitName: stock.sent_input_unit_name,
      sentNum: stock.sent_num,
      signNum: signStatus === 'FH_YQS' ? stock.sign_num : stock.sent_num,
      picUrl: stock.small_pic,
    };
  });
};

const convertStoreHouses = (storeHouses) => {
  return storeHouses.map(storeHouse => {
    return {
      id: storeHouse.id,
      name: storeHouse.name,
      selected: storeHouse.is_default === '1' ? true : false
    };
  });
};

const getSignCount = (stocks, signStatus) => {
  let stockCount = '';
  const count = {};
  stocks.forEach((stock) => {
    const keys = Object.keys(count);
    if (keys.includes(stock.sent_input_unit_name)) {
      count[stock.sent_input_unit_name] = count[stock.sent_input_unit_name] + (signStatus === 'FH_YQS' ? stock.sign_num : stock.sent_num);
    } else {
      count[stock.sent_input_unit_name] = (signStatus === 'FH_YQS' ? stock.sign_num : stock.sent_num);
    }
  });
  const countKeys = Object.keys(count);
  countKeys.forEach((countKey) => {
    stockCount = stockCount + count[countKey] + countKey;
  });
  return stockCount;
};

const getNewSignCount = (stocks) => {
  let stockCount = '';
  const count = {};
  stocks.forEach((stock) => {
    const keys = Object.keys(count);
    if (keys.includes(stock.unitName)) {
      count[stock.unitName] = count[stock.unitName] + stock.signNum;
    } else {
      count[stock.unitName] = stock.signNum;
    }
  });
  const countKeys = Object.keys(count);
  countKeys.forEach((countKey) => {
    stockCount = stockCount + count[countKey] + countKey;
  });
  return stockCount;
};

const convertRecords = (data) => {
  return data && data.map((record) => {
    return {
      id: record.sent_id,
      supplier: record.supplier_name,
      sentTime: record.sent_time,
      storeId: record.to_storehouse,
      storeName: record.to_storehouse_name,
      isSign: record.sign_status === 'FH_YQS' ? true : false,
      stocks: convertStocks(record.sent_records, record.sign_status),
      storeHouses: convertStoreHouses(record.store_houses),
      signCount: getSignCount(record.sent_records, record.sign_status),
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
        needComment: data[0].inhouse_need_appraise === '1' ? true : false,
        sentRecords: convertRecords(data)
      };
    case GET_SENT_RECORDS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case COUNT_CHANGE:
      return {
        ...state,
        sentRecords: action.records
      };
    case GET_STORE_HOUSES:
      return {
        ...state,
        storeHouses: action.storeHouses
      };
    case ON_SELECT_HOUSE:
      return {
        ...state,
        sentRecords: action.records
      };
    case CONFIRM_SIGN:
      return {
        ...state
      };
    case CONFIRM_SIGN_SUCCESS:
      return {
        ...state
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
 * 修改签收数量
 */
export function countChange(count, id, recordId) {
  return (dispatch, getState) => {
    // 深度克隆
    const records = cloneDeep(getState().stock.sentRecords);
    records.forEach((record) => {
      if (record.id === recordId) {
        record.stocks.forEach((stock) => {
          if (stock.id === id) {
            stock.signNum = count;
          }
        });
        const signCount = getNewSignCount(record.stocks);
        record.signCount = signCount;
      }
    });
    dispatch({
      type: COUNT_CHANGE,
      records: records
    });
  };
}

/**
 * 获取仓库数据
 */
export function getStoreHouses(id) {
  return (dispatch, getState) => {
    const records = [...getState().stock.sentRecords];
    const storeHouses = records.filter((record) => {
      return record.id === id;
    })[0].storeHouses;
    dispatch({
      type: GET_STORE_HOUSES,
      storeHouses
    });
  };
}

/**
 * 修改选择的仓库
 */
export function onSelectHouse(id, newStoreHouses) {
  return (dispatch, getState) => {
    const records = [...getState().stock.sentRecords];
    const selectedStore = newStoreHouses.filter(newStoreHouse => {
      return newStoreHouse.selected;
    })[0];
    const newRecords = records.map(record => {
      if (record.id === id) {
        return {
          ...record,
          storeHouses: newStoreHouses,
          storeId: selectedStore.id,
          storeName: selectedStore.name,
        };
      }
      return record;
    });
    dispatch({
      type: ON_SELECT_HOUSE,
      records: newRecords
    });
  };
}

export function getSubmitRecords(records, id) {
  const stocks = records.filter((record) => {
    return record.id === id;
  })[0].stocks;
  return stocks.map((stock) => {
    return {
      sent_detail_id: stock.id,
      sign_input_unit: stock.unitId,
      sign_num: stock.signNum
    };
  });
}

/**
 * 确认签收
 */
export function confirmSign(params) {
  return {
    types: [CONFIRM_SIGN, CONFIRM_SIGN_SUCCESS, CONFIRM_SIGN_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/sign.action`, {
      data: params
    })
  };
}
