// 商品查询服务端请求
const GET_GOODS = 'search/GET_GOODS';
const GET_GOODS_SUCCESS = 'search/GET_GOODS_SUCCESS';
const GET_GOODS_FAILURE = 'search/GET_GOODS_FAILURE';

// 增加商品按钮点击
const INIT_SLIDE = 'search/INIT_SLIDE'; // 初始化Slide位置
const SHOW_SLIDE = 'search/SHOW_SLIDE'; // 显示Slide
const HIDE_SLIDE = 'search/HIDE_SLIDE'; // 隐藏Slide

// 获取当前商品
const GET_CURRENT_GOOD = 'search/GET_CURRENT_GOOD';

// 修改商品数量
const COUNT_CHANGE = 'search/COUNT_CHANGE';

// 切换单位
const UNIT_CHANGE = 'search/UNIT_CHANGE';

// 加入购物车
const ADD_IN_CART = 'search/ADD_IN_CART';
const ADD_IN_CART_SUCCESS = 'search/ADD_IN_CART_SUCCESS';
const ADD_IN_CART_FAILURE = 'search/ADD_IN_CART_FAILURE';

// 初始化Data
const INIT_DATA = 'search/INIT_DATA';


const initial = {
  priceVisible: true, // 是否显示价格
  hasData: true,
  hasMore: false, // 是否有更多数据
  page: 1, // 当前页
  rows: 20, // 每页显示的数据条数
  goods: [], // 商品
  total: 0, // 商品总数
  slideShow: false, // 加入购物车页面是否显示
  xDis: 999, // 加入购物车页面页边距
  good: null, // 当前选中的商品
  isLoading: false // 加载数据
};

// 通过ID筛选数组
const filterArrsById = (arrs, id) => {
  return (arrs.filter((arr) => {
    return arr.id === id;
  })[0]);
};

// 获取默认unitId
const getCurrentUnit = (units) => {
  return units.filter((unit) => {
    return unit.is_base === '1';
  })[0].unit_name;
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

// 转化商品数组
const covertGoods = (goods) => {
  const newGoods = goods && goods.map((good, index) => {
    const props = [];
    if (good.prop_info) {
      good.prop_info.forEach((prop) => {
        props.push(prop.prop_value);
      });
    }
    return {
      brand: good.brand, // 品牌
      typeId: good.class_id, // 商品类型
      code: good.code, // 商品编码
      name: good.name, // 商品名称
      spec: good.name_spec, // 规格属性
      title: good.name + ' ' + ( good.spec || '' ), // 列表显示title
      id: good.pd_id, // 商品Id
      picUrl: good.picture, // 商品图片地址
      price: good.price, // 商品价格
      isPromotion: good.promotion === '1' ? true : false, // 是否促销
      subtitle: good.prop_values, // 属性
      units: convertUnits(good.unit_info), // 单位信息,
      unit: getCurrentUnit(good.unit_info),
      odd: index % 2 !== 0, // 商品索引是奇数／偶数,用于显示不同的图标
      itemType: good.item_type, // 1:商品 2:组合促销 3:买赠促销
      promotionId: good.item_type === '3' ? good.bind_mz_promotion_id : '' // 有买赠促销时的促销ID
    };
  });
  return newGoods;
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
    case GET_GOODS:
      return {
        ...state,
        isLoading: action.loadMore ? false : true,
        goods: action.loadMore ? state.goods : [],
        page: action.loadMore ? state.page : 1
      };
    case GET_GOODS_SUCCESS: // 获取商品
      let hasMore = true;
      const data = action && action.result && action.result.data;
      let goods = data && data.products;
      if (goods.length < 20) hasMore = false;
      if (state.page === 1) {
        goods = covertGoods(goods);
      } else {
        goods = state.goods.slice().concat(covertGoods(goods));
      }
      return {
        ...state,
        priceVisible: data.price_visible === '1',
        hasData: data.total > 0,
        total: data.total,
        page: state.page + 1,
        hasMore: hasMore,
        isLoading: false,
        goods
      };
    case GET_GOODS_FAILURE:
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
    case GET_CURRENT_GOOD:
      const good = filterArrsById([...state.goods], action.id);
      good.count = 1; // 数量设置为1
      return {
        ...state,
        good: good
      };
    case COUNT_CHANGE:
      const curGood = {...state.good};
      curGood.count = action.count;
      return {
        ...state,
        good: curGood
      };
    case UNIT_CHANGE:
      let unitGood = {...state.good};
      unitGood = selectUnits(unitGood, action.unitId);
      return {
        ...state,
        good: unitGood
      };
    case ADD_IN_CART:
      return {
        ...state
      };
    case ADD_IN_CART_SUCCESS:
      return {
        ...state
      };
    case INIT_DATA:
      return {
        ...state,
        goods: [],
        total: 0
      };
    default:
      return state;
  }
}

/**
 * 获取商品
 */
export function getGoods(params, loadMore) {
  if (!loadMore) {
    params.page = 1;
  }
  return {
    types: [GET_GOODS, GET_GOODS_SUCCESS, GET_GOODS_FAILURE],
    loadMore,
    promise: client => client.post(`/biz/std_mendian/pd/client/v1/queryPds.action`, {
      data: params
    })
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
 * 获取当前商品
 */
export function getCurrGood(id) {
  return dispatch => {
    dispatch({
      type: GET_CURRENT_GOOD,
      id: id
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
 * 初始化数据
 */
export function initData() {
  return dispatch => {
    dispatch({
      type: INIT_DATA
    });
  };
}
