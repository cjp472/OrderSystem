// 获取商品类型服务端请求
const GET_TYPES = 'goods/GET_TYPES';
const GET_TYPES_SUCCESS = 'goods/GET_TYPES_SUCCESS';
const GET_TYPES_FAILURE = 'goods/GET_TYPES_FAILURE';

// 商品类型选择
const SELECT_TYPES = 'goods/SELECT_TYPES';
const SELECT_SUB_TYPES = 'goods/SELECT_SUB_TYPES';

// 商品查询服务端请求
const GET_GOODS = 'goods/GET_GOODS';
const GET_GOODS_SUCCESS = 'goods/GET_GOODS_SUCCESS';
const GET_GOODS_FAILURE = 'goods/GET_GOODS_FAILURE';

// 增加商品按钮点击
const INIT_SLIDE = 'goods/INIT_SLIDE'; // 初始化Slide位置
const SHOW_SLIDE = 'goods/SHOW_SLIDE'; // 显示Slide
const HIDE_SLIDE = 'goods/HIDE_SLIDE'; // 隐藏Slide

// 获取当前商品
const GET_CURRENT_GOOD = 'goods/GET_CURRENT_GOOD';

// 修改商品数量
const COUNT_CHANGE = 'goods/COUNT_CHANGE';

// 切换单位
const UNIT_CHANGE = 'goods/UNIT_CHANGE';

// 加入购物车
const ADD_IN_CART = 'goods/ADD_IN_CART';
const ADD_IN_CART_SUCCESS = 'goods/ADD_IN_CART_SUCCESS';
const ADD_IN_CART_FAILURE = 'goods/ADD_IN_CART_FAILURE';

// 重置page和currentType
const INIT_DATA = 'goods/INIT_DATA';


const initial = {
  types: [], // 商品类型
  priceVisible: true, // 是否显示价格
  hasMore: false, // 是否有更多数据
  page: 1, // 当前页
  rows: 20, // 每页显示的数据条数
  currentType: '-1', // 初始化类型，默认全部商品
  goods: [], // 商品
  slideShow: false, // 加入购物车页面是否显示
  xDis: 999, // 加入购物车页面页边距
  good: null, // 当前选中的商品
  isLoading: true, // 默认进来加载中，等到数据加载成功置为false
};

// 通过ID筛选数组
const filterArrsById = (arrs, id) => {
  return (arrs.filter((arr) => {
    return arr.id === id;
  })[0]);
};

// 转化子类型
const convertChildType = (items) => {
  const children = items.map((item) => {
    return {
      id: item.class_id,
      name: item.name,
      active: false
    };
  });
  return children;
};

// 转化类型
const convertType = (item) => {
  const children = item.child_List && item.child_List.length ? convertChildType(item.child_List) : null;
  return {
    id: item.class_id,
    name: item.name,
    active: item.class_id === '-1' ? true : false,
    hasChildren: item.child_List && item.child_List.length ? true : false,
    open: false,
    children
  };
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

// 转化商品数组
const covertGoods = (goods) => {
  const newGoods = goods && goods.map((good) => {
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

// 点击类型时，重新设置类型数据
const setTypesById = (types, id) => {
  const selectType = filterArrsById(types, id);
  const hasChildren = selectType.hasChildren;
  const newTypes = types.map((type) => {
    let children = null;
    if (!hasChildren) { // 当前节点无子节点,则要取消之前所有子节点的选中状态
      children = type.children && type.children.map((child) => {
        return {
          ...child,
          active: type.id !== id && false
        };
      });
    }
    return {
      ...type,
      active: type.id === id ? true : false, // 激活状态
      open: type.id === id ? !type.open : false, // 打开关闭状态
      children: hasChildren ? type.children : children
    };
  });
  return newTypes;
};

// 点击子类型时，重新设置类型数据
const setTypesBySubId = (types, id, subId) => {
  const newTypes = types.map((type) => {
    const children = type.children && type.children.map((child) => {
      return {
        ...child,
        active: type.id === id && child.id === subId
      };
    });
    return {
      ...type,
      children
    };
  });
  return newTypes;
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_TYPES:
      return {
        ...state
      };
    case GET_TYPES_SUCCESS: // 获取商品类型
      let goodTypes = action && action.result && action.result.data
        && action.result.data.pd_types;
      goodTypes = goodTypes && goodTypes.map((type) => {
        return convertType(type);
      });
      return {
        ...state,
        types: goodTypes
      };
    case GET_TYPES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SELECT_TYPES: // 点击商品类型
      // 通过Id筛选出当前选中的类型
      // const selectedType = filterArrsById([...state.types], action.id);
      // const hasChildren = selectedType.hasChildren;
      return {
        ...state,
        page: 1,
        currentType: action.id,
        goods: action.open ? state.goods : [],
        hasMore: action.open ? state.hasMore : false,
        types: setTypesById([...state.types], action.id),
        isLoading: action.open ? false : true
      };
    case SELECT_SUB_TYPES: // 点击子商品类型
      return {
        ...state,
        page: 1,
        currentType: action.subId,
        goods: [],
        hasMore: false,
        types: setTypesBySubId([...state.types], action.id, action.subId),
        isLoading: true
      };
    case GET_GOODS:
      return {
        ...state
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
        page: state.page + 1,
        hasMore: hasMore,
        isLoading: false,
        goods
      };
    case GET_GOODS_FAILURE:
      return {
        ...state,
        isLoading: false,
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
        page: action.page,
        currentType: action.currentType
      };
    default:
      return state;
  }
}

/**
 * 获取商品类型
 */
export function getTypes() {
  return {
    types: [GET_TYPES, GET_TYPES_SUCCESS, GET_TYPES_FAILURE],
    promise: client => client.post(`/biz/std_mendian/pd/client/v1/queryPdTypes.action`)
  };
}

/**
 * 获取商品
 */
export function getGoods(params) {
  return {
    types: [GET_GOODS, GET_GOODS_SUCCESS, GET_GOODS_FAILURE],
    promise: client => client.post(`/biz/std_mendian/pd/client/v1/queryPds.action`, {
      data: params
    }),
    currentType: params.class_id
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
 * 类型选择
 */
export function selectGoods(id, open) {
  return dispatch => {
    dispatch({
      type: SELECT_TYPES,
      id,
      open
    });
  };
}

/**
 * 子类型选择
 */
export function selectSubGoods(id, subId) {
  return dispatch => {
    dispatch({
      type: SELECT_SUB_TYPES,
      id,
      subId
    });
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
export function initData(page, currentType) {
  return dispatch => {
    dispatch({
      type: INIT_DATA,
      page,
      currentType
    });
  };
}


