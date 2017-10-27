// 商品查询服务端请求
const GET_DETAIL = 'detail/GET_DETAIL';
const GET_DETAIL_SUCCESS = 'detail/GET_DETAIL_SUCCESS';
const GET_DETAIL_FAILURE = 'detail/GET_DETAIL_FAILURE';

// 增加商品按钮点击
const INIT_SLIDE = 'detail/INIT_SLIDE'; // 初始化Slide位置
const SHOW_SLIDE = 'detail/SHOW_SLIDE'; // 显示Slide
const HIDE_SLIDE = 'detail/HIDE_SLIDE'; // 隐藏Slide

// 修改商品数量
const COUNT_CHANGE = 'detail/COUNT_CHANGE';

// 切换单位
const UNIT_CHANGE = 'detail/UNIT_CHANGE';

// 加入购物车
const ADD_IN_CART = 'detail/ADD_IN_CART';
const ADD_IN_CART_SUCCESS = 'detail/ADD_IN_CART_SUCCESS';
const ADD_IN_CART_FAILURE = 'detail/ADD_IN_CART_FAILURE';


const initial = {
  detail: null, // 商品
  slideShow: false, // 加入购物车页面是否显示
  xDis: 999, // 加入购物车页面页边距
  priceVisible: true,
  isLoading: true,
};

// 转化单位
const convertUnits = (units) => {
  return units.map((unit) => {
    return {
      id: unit.unit_id,
      name: unit.unit_name,
      price: unit.unit_price,
      active: unit.is_base === '1' ? true : false,
      isBase: unit.is_base
    };
  });
};

// 获取默认unitId
const getCurrentUnit = (units) => {
  return units.filter((unit) => {
    return unit.is_base === '1';
  })[0].unit_name;
};

// const convertPrice = (price) => {
//   if (price || price === 0) {
//     return price;
//   }
//   return null;
// };

// 转化商品详情
const convertDetail = (detail, priceVisible) => {
  const props = [];
  if (detail.prop_info) {
    detail.prop_info.forEach((prop) => {
      props.push(prop.prop_value);
    });
  }
  return {
    imgs: detail.pictures || [],
    title: detail.name,
    subtitle: props.join(','),
    tag: detail.promotion === '1' ? '促销' : '',
    id: detail.pd_id,
    itemType: detail.item_type, // 1:商品 2:组合促销 3:买赠促销
    promotionId: detail.item_type === '3' ? detail.bind_mz_promotion_id : '', // 有买赠促销时的促销ID
    picUrl: detail.picture, // 商品图片地址
    units: convertUnits(detail.unit_info), // 单位信息,
    unit: getCurrentUnit(detail.unit_info),
    isPromotion: detail.promotion === '1' ? true : false, // 是否促销
    price: detail.price, // 商品价格
    count: 1, // 默认商品数量为1
    items: [
      {
        title: '售价',
        price: priceVisible ? detail.price : null
      },
      {
        title: '类型',
        value: detail.type_name
      },
      {
        title: '品牌',
        value: detail.brand
      },
      {
        title: '基本单位',
        value: detail.unit
      },
      {
        title: '条码' + (detail.unit ? `(${detail.unit})` : ''),
        value: detail.barcode
      },
      {
        title: '建议零售价',
        value: priceVisible ? detail.suggest_price : null
      },
      {
        title: '保质期(天)',
        value: detail.valid_period
      },
      {
        title: '重量',
        value: detail.weight
      }
    ],
    picDetail: detail.detail
  };
};

const selectUnits = (good, unitId) => {
  const units = good.units.map((unit) => {
    return {
      ...unit,
      active: unit.id === unitId ? true : false,
    };
  });
  const currentUnit = units.filter((unit) => {
    return unit.active;
  })[0];
  const price = currentUnit.price || 0;
  const unit = currentUnit.name || '';
  good.units = units;
  good.price = price;
  good.unit = unit;
  return good;
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_DETAIL:
      return {
        ...state,
        detail: null,
        isLoading: true,
      };
    case GET_DETAIL_SUCCESS:
      const priceVisible = action.result.price_visible === '1';
      return {
        ...state,
        priceVisible,
        detail: convertDetail(action.result.data, priceVisible),
        isLoading: false,
      };
    case GET_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case INIT_SLIDE:
      return {
        ...state,
        xDis: action.xDis
      };
    case SHOW_SLIDE:
      return {
        ...state,
        slideShow: action.slideShow,
        xDis: action.xDis
      };
    case HIDE_SLIDE:
      return {
        ...state,
        slideShow: action.slideShow,
        xDis: action.xDis
      };
    case COUNT_CHANGE:
      const curDetail = {...state.detail};
      curDetail.count = action.count;
      return {
        ...state,
        detail: curDetail
      };
    case UNIT_CHANGE:
      let unitDetail = {...state.detail};
      unitDetail = selectUnits(unitDetail, action.unitId);
      return {
        ...state,
        detail: unitDetail
      };
    default:
      return state;
  }
}

/**
 * 获取商品详情
 */
export function getDetail(params) {
  return {
    types: [GET_DETAIL, GET_DETAIL_SUCCESS, GET_DETAIL_FAILURE],
    promise: client => client.post(`/biz/std_mendian/pd/client/v1/queryPdInfo.action`, {
      data: params
    })
  };
}

/**
 * 初始化slide位置
 */
export function initSlide(xDis) {
  return dispatch => {
    dispatch({
      type: INIT_SLIDE,
      xDis: xDis
    });
  };
}

/**
 * 显示Slide
 */
export function showSlide(xDis) {
  return dispatch => {
    dispatch({
      type: SHOW_SLIDE,
      xDis: xDis,
      slideShow: true
    });
  };
}

/**
 * 隐藏Slide
 */
export function hideSlide(xDis) {
  return dispatch => {
    dispatch({
      type: HIDE_SLIDE,
      xDis: xDis,
      slideShow: false
    });
  };
}

/**
 * 修改当前商品数量
 */
export function countChange(count) {
  return dispatch => {
    dispatch({
      type: COUNT_CHANGE,
      count: count
    });
  };
}

/**
 * 切换单位
 */
export function unitChange(unitId) {
  return dispatch => {
    dispatch({
      type: UNIT_CHANGE,
      unitId: unitId
    });
  };
}

/**
 * 加入购物车
 */
export function addInCart(params) {
  return {
    types: [ADD_IN_CART, ADD_IN_CART_SUCCESS, ADD_IN_CART_FAILURE],
    promise: client => client.post(`/biz/std_mendian/shoppingCart/client/v1/add.action`, {
      data: params
    })
  };
}
