// 获取商品类型服务端请求
const GET_CART_GOODS = 'cart/GET_CART_GOODS';
const GET_CART_GOODS_SUCCESS = 'cart/GET_CART_GOODS_SUCCESS';
const GET_CART_GOODS_FAILURE = 'cart/GET_CART_GOODS_FAILURE';

// 修改购物车记录数量
const COUNT_CHANGE_REQ = 'cart/COUNT_CHANGE_REQ';
const COUNT_CHANGE_REQ_SUCCESS = 'cart/COUNT_CHANGE_REQ_SUCCESS';
const COUNT_CHANGE_REQ_FAILURE = 'cart/COUNT_CHANGE_REQ_FAILURE';

// 批量删除购物车记录数量
const DELETE_GOODS = 'cart/DELETE_GOODS';
const DELETE_GOODS_SUCCESS = 'cart/DELETE_GOODS_SUCCESS';
const DELETE_GOODS_FAILURE = 'cart/DELETE_GOODS_FAILURE';

// 修改选中状态
const CHECK_CHANGE = 'cart/CHECK_CHANGE';

// 全选
const CHECK_ALL_CHANGE = 'cart/CHECK_ALL_CHANGE';

// 删除全选
const CHECK_ALL_DELETE = 'cart/CHECK_ALL_DELETE';

// 修改商品数量
const COUNT_CHANGE = 'cart/COUNT_CHANGE';

// 编辑
const EDIT_CHANGE = 'cart/EDIT_CHANGE';

// 获取购物车数量
const GET_CART_COUNT = 'cart/GET_CART_COUNT';
const GET_CART_COUNT_SUCCESS = 'cart/GET_CART_COUNT_SUCCESS';
const GET_CART_COUNT_FAILURE = 'cart/GET_CART_COUNT_FAILURE';

// 再次购买
const BUY_AGAIN = 'cart/BUY_AGAIN';

const initial = {
  customer: '', // 客户名称
  supplier: '', // 供货商
  priceVisible: true, // 是否显示价格
  gifts: [], // 买赠促销叠加促销赠品
  items: [],
  expiryItems: [],
  totalPrice: '0', // 总价
  total: 0, // 选中商品总数
  checkAll: true,
  checkAllDel: false,
  isEdit: false,
  cartCount: 0,
  title: '购物车',
  isLoading: true,
};

const convertProduct = (product) => {
  return {
    isGift: product.is_gift === '1' ? true : false,
    count: product.item_count,
    price: product.price,
    subtitle: product.name_spec,
    id: product.pd_id,
    title: product.pd_name + ' ' + ( product.spec || '' ),
    unitId: product.unit_id,
    unit: product.unit_name,
    cartId: String(product.shopping_cart_item_id),
    picUrl: product.small_pic,
    delChecked: false,
    checked: true,
    info: product.item_count + product.unit_name + '/组',
  };
};

const covertProducts = (products) => {
  return products.map((product) => {
    return convertProduct(product);
  });
};

const convertGifts = (gifts) => {
  return gifts.map((gift) => {
    return {
      count: gift.item_count,
      title: '赠品：' + gift.pd_name + ' ' + ( gift.spec || '' ),
      id: gift.pd_id,
      unitId: gift.unit_id,
      unit: gift.unit_name,
      tip: 'X' + gift.item_count + gift.unit_name,
    };
  });
};

const convertItems = (items) => {
  if (!items) {
    return [];
  }
  return items.map((item) => {
    if (item.item_type === '2') { // 组合促销
      return {
        type: item.item_type,
        id: item.zh_promotion.id,
        count: item.zh_promotion.item_count,
        title: item.zh_promotion.name,
        price: item.zh_promotion.price,
        cartId: item.zh_promotion.shopping_cart_item_id,
        delChecked: false,
        checked: true,
        unit: '组',
        products: covertProducts(item.zh_promotion.products),
      };
    } else if (item.item_type === '3') { // 买赠促销
      return {
        type: item.item_type,
        title: item.mz_promotion.hint,
        id: item.mz_promotion.id,
        products: covertProducts(item.mz_promotion.promotion_products),
        gifts: convertGifts(item.mz_promotion.promotion_gifts),
      };
    } else if (item.item_type === '1') { // 普通商品
      return {
        type: item.item_type,
        product: convertProduct(item.pd_info)
      };
    }
  });
};

const convertOverLapGift = (gifts) => {
  if (!gifts) {
    return [];
  }
  return gifts && gifts.map((gift) => {
    return {
      id: gift.id,
      type: '3',
      title: gift.rule,
      products: convertGifts(gift.products)
    };
  });
};

const covertExpiryItems = (items) => {
  if (!items) {
    return [];
  }
  return items.map((item) => {
    if (item.item_type === '2') { // 组合促销
      return {
        type: item.item_type,
        cartId: item.zh_promotion.shopping_cart_item_id,
        products: covertProducts(item.zh_promotion.products),
      };
    } else if (item.item_type === '1') { // 普通商品
      return {
        type: item.item_type,
        product: convertProduct(item.pd_info)
      };
    }
  });
};

const getTotal = (items) => {
  let totalPrice = 0; // 选中商品总价
  let total = 0; // 选中商品总数
  let checkAll = true; // 是否全选
  items.forEach((item) => {
    if (item.type === '1') {
      totalPrice = totalPrice + (item.product.checked ? item.product.count * Number(item.product.price) : 0);
      total = total + (item.product.checked ? 1 : 0);
      checkAll = checkAll && item.product.checked;
    } else if (item.type === '2') {
      totalPrice = totalPrice + (item.checked ? item.count * Number(item.price) : 0);
      total = total + (item.checked ? 1 : 0);
      checkAll = checkAll && item.checked;
    } else if (item.type === '3') {
      item.products.forEach((product) => {
        totalPrice = totalPrice + (product.checked ? product.count * Number(product.price) : 0);
        total = total + (product.checked ? 1 : 0);
        checkAll = checkAll && product.checked;
      });
    }
  });
  return {
    totalPrice: String(totalPrice),
    total,
    checkAll
  };
};

const getCheckAllDel = (items) => {
  let checkAllDel = true; // 删除是否全选
  items.forEach((item) => {
    if (item.type === '1') {
      checkAllDel = checkAllDel && item.product.delChecked;
    } else if (item.type === '2') {
      checkAllDel = checkAllDel && item.delChecked;
    } else if (item.type === '3') {
      item.products.forEach((product) => {
        checkAllDel = checkAllDel && product.delChecked;
      });
    }
  });
  return checkAllDel;
};

const resetProduct = (product, checked, cartId) => {
  return {
    ...product,
    checked: product.cartId === cartId ? checked : product.checked,
  };
};

const resetProducts = (products, checked, cartId) => {
  return products.map((product) => {
    return resetProduct(product, checked, cartId);
  });
};

const resetItems = (items, checked, cartId) => {
  return items && items.map((item) => {
    if (item.type === '2') { // 组合促销
      return {
        ...item,
        checked: item.cartId === cartId ? checked : item.checked
      };
    } else if (item.type === '3') { // 买赠促销
      return {
        ...item,
        products: resetProducts(item.products, checked, cartId),
      };
    } else if (item.type === '1') { // 普通商品
      return {
        ...item,
        product: resetProduct(item.product, checked, cartId),
      };
    }
  });
};

const resetCheckProduct = (product, checked) => {
  return {
    ...product,
    checked,
  };
};

const resetCheckProducts = (products, checked) => {
  return products.map((product) => {
    return resetCheckProduct(product, checked);
  });
};

const resetCheckItems = (items, checked) => {
  return items && items.map((item) => {
    if (item.type === '2') { // 组合促销
      return {
        ...item,
        checked: checked
      };
    } else if (item.type === '3') { // 买赠促销
      return {
        ...item,
        products: resetCheckProducts(item.products, checked),
      };
    } else if (item.type === '1') { // 普通商品
      return {
        ...item,
        product: resetCheckProduct(item.product, checked),
      };
    }
  });
};

// 再次购买选中重置
const resetBuyAgainProduct = (product, cartIds) => {
  return {
    ...product,
    checked: cartIds.includes(product.cartId),
  };
};

// 再次购买选中重置
const resetBuyAgainProducts = (products, cartIds) => {
  return products.map((product) => {
    return resetBuyAgainProduct(product, cartIds);
  });
};

// 再次购买选中重置
const resetBuyAgainItems = (items, cartIds) => {
  return items && items.map((item) => {
    if (item.type === '2') { // 组合促销
      return {
        ...item,
        checked: cartIds.includes(item.cartId)
      };
    } else if (item.type === '3') { // 买赠促销
      return {
        ...item,
        products: resetBuyAgainProducts(item.products, cartIds),
      };
    } else if (item.type === '1') { // 普通商品
      return {
        ...item,
        product: resetBuyAgainProduct(item.product, cartIds),
      };
    }
  });
};

const resetCountProduct = (product, count, cartId) => {
  return {
    ...product,
    count: product.cartId === cartId ? count : product.count,
  };
};

const resetCountProducts = (products, count, cartId) => {
  return products.map((product) => {
    return resetCountProduct(product, count, cartId);
  });
};

const resetCountItems = (items, count, cartId) => {
  return items && items.map((item) => {
    if (item.type === '2') { // 组合促销
      return {
        ...item,
        count: item.cartId === cartId ? count : item.count
      };
    } else if (item.type === '3') { // 买赠促销
      return {
        ...item,
        products: resetCountProducts(item.products, count, cartId),
      };
    } else if (item.type === '1') { // 普通商品
      return {
        ...item,
        product: resetCountProduct(item.product, count, cartId),
      };
    }
  });
};

const convertCurrentGifts = (gift) => {
  if (!gift) {
    return null;
  }
  return {
    id: gift.id,
    title: gift.hint,
    gifts: convertGifts(gift.promotion_gifts),
  };
};

const resetGiftItems = (items, currentGifts) => {
  if (!currentGifts) {
    return items;
  }
  return items && items.map((item) => {
    if (item.type === '3') { // 组合促销
      return {
        ...item,
        gifts: item.id === currentGifts.id ? currentGifts.gifts : item.gifts,
        title: item.id === currentGifts.id ? currentGifts.title : item.title,
      };
    }
    return item;
  });
};

const resetDelProduct = (product, checked, cartId) => {
  return {
    ...product,
    delChecked: product.cartId === cartId ? checked : product.delChecked,
  };
};

const resetDelProducts = (products, checked, cartId) => {
  return products.map((product) => {
    return resetDelProduct(product, checked, cartId);
  });
};

const resetDelItems = (items, checked, cartId) => {
  return items && items.map((item) => {
    if (item.type === '2') { // 组合促销
      return {
        ...item,
        delChecked: item.cartId === cartId ? checked : item.delChecked
      };
    } else if (item.type === '3') { // 买赠促销
      return {
        ...item,
        products: resetDelProducts(item.products, checked, cartId),
      };
    } else if (item.type === '1') { // 普通商品
      return {
        ...item,
        product: resetDelProduct(item.product, checked, cartId),
      };
    }
  });
};

const resetAllDelProduct = (product, delChecked) => {
  return {
    ...product,
    delChecked,
  };
};

const resetAllDelProducts = (products, delChecked) => {
  return products.map((product) => {
    return resetAllDelProduct(product, delChecked);
  });
};

const resetAllDelItems = (items, delChecked) => {
  return items && items.map((item) => {
    if (item.type === '2') { // 组合促销
      return {
        ...item,
        delChecked: delChecked
      };
    } else if (item.type === '3') { // 买赠促销
      return {
        ...item,
        products: resetAllDelProducts(item.products, delChecked),
      };
    } else if (item.type === '1') { // 普通商品
      return {
        ...item,
        product: resetAllDelProduct(item.product, delChecked),
      };
    }
  });
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_CART_GOODS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CART_GOODS_SUCCESS:
      const data = action.result && action.result.data;
      // 商品列表
      const items = convertItems(data.shopping_cart_items);
      // 叠加赠品
      const gifts = convertOverLapGift(data.mz_promotion_overlaps);
      // 失效商品
      const expiryItems = covertExpiryItems(data.invalid_cart_items);
      // 总价,总数,全部选中
      let total = 0;
      let totalPrice = 0;
      let checkAll = true;
      let title = '购物车';
      if (items) {
        total = getTotal(items).total;
        title = title + (items.length > 0 ? `(${items.length})` : '');
        totalPrice = getTotal(items).totalPrice;
        checkAll = getTotal(items).checkAll;
      }
      return {
        ...state,
        title,
        customer: data.customer_name,
        supplier: data.supplier_name,
        priceVisible: data.price_visible === '1' ? true : false,
        isEdit: false,
        isLoading: false,
        items,
        gifts,
        expiryItems,
        total,
        totalPrice,
        checkAll
      };
    case GET_CART_GOODS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case CHECK_CHANGE:
      const { checked, cartId } = action;
      if (state.isEdit) {
        const delItems = resetDelItems([...state.items], checked, cartId);
        const checkAllDel = getCheckAllDel(delItems);
        return {
          ...state,
          items: delItems,
          checkAllDel
        };
      }
      const newItems = resetItems([...state.items], checked, cartId);
      const totalObject = getTotal(newItems);
      const newTotal = totalObject.total;
      const newTotalPrice = totalObject.totalPrice;
      const newCheckAll = totalObject.checkAll;
      return {
        ...state,
        items: newItems,
        total: newTotal,
        totalPrice: newTotalPrice,
        checkAll: newCheckAll
      };
    case CHECK_ALL_CHANGE:
      const newItems2 = resetCheckItems([...state.items], action.checked);
      const totalObject2 = getTotal(newItems2);
      const newTotal2 = totalObject2.total;
      const newTotalPrice2 = totalObject2.totalPrice;
      const newCheckAll2 = totalObject2.checkAll;
      return {
        ...state,
        items: newItems2,
        total: newTotal2,
        totalPrice: newTotalPrice2,
        checkAll: newCheckAll2
      };
    case COUNT_CHANGE:
      const newItems3 = resetCountItems([...state.items], action.count, action.cartId);
      const totalObject3 = getTotal(newItems3);
      const newTotal3 = totalObject3.total;
      const newTotalPrice3 = totalObject3.totalPrice;
      const newCheckAll3 = totalObject3.checkAll;
      return {
        ...state,
        items: newItems3,
        total: newTotal3,
        totalPrice: newTotalPrice3,
        checkAll: newCheckAll3
      };
    case COUNT_CHANGE_REQ:
      return {
        ...state
      };
    case COUNT_CHANGE_REQ_SUCCESS:
      const changeData = action.result && action.result.data;
      // 叠加赠品
      const changeGifts = convertOverLapGift(changeData.mz_promotion_overlaps);
      const currentGifts = convertCurrentGifts(changeData.mz_promotion);
      const newItem4 = resetGiftItems([...state.items], currentGifts);
      return {
        ...state,
        items: newItem4,
        gifts: changeGifts,
      };
    case GET_CART_COUNT:
      return {
        ...state
      };
    case GET_CART_COUNT_SUCCESS:
      return {
        ...state,
        cartCount: action.result.data
      };
    case EDIT_CHANGE:
      const newItem5 = resetAllDelItems([...state.items], false);
      const checkAllDel5 = getCheckAllDel(newItem5);
      return {
        ...state,
        isEdit: action.isEdit,
        items: newItem5,
        checkAllDel: checkAllDel5
      };
    case DELETE_GOODS:
      return {
        ...state
      };
    case DELETE_GOODS_SUCCESS:
      return {
        ...state
      };
    case BUY_AGAIN:
      return {
        ...state,
        items: action.items,
        total: action.total,
        totalPrice: action.totalPrice,
        checkAll: action.checkAll
      };
    case CHECK_ALL_DELETE:
      return {
        ...state,
        items: action.items,
        checkAllDel: action.checkAllDel
      };
    default:
      return state;
  }
}

/**
 * 获取下单的Ids
 */
export function getSubmitIds(items) {
  const ids = [];
  items.forEach((item) => {
    if (item.type === '1') {
      if (item.product.checked) ids.push(item.product.cartId);
    } else if (item.type === '2') {
      if (item.checked) ids.push(item.cartId);
    } else if (item.type === '3') {
      item.products.forEach((product) => {
        if (product.checked) ids.push(product.cartId);
      });
    }
  });
  return ids;
}

/**
 * 获取删除的Ids
 */
export function getDelIds(items) {
  const ids = [];
  items.forEach((item) => {
    if (item.type === '1') {
      if (item.product.delChecked) ids.push(item.product.cartId);
    } else if (item.type === '2') {
      if (item.delChecked) ids.push(item.cartId);
    } else if (item.type === '3') {
      item.products.forEach((product) => {
        if (product.delChecked) ids.push(product.cartId);
      });
    }
  });
  return ids;
}

/**
 * 获取删除的Ids
 */
export function getExpiryIds(items) {
  const ids = [];
  items.forEach((item) => {
    if (item.type === '1') {
      ids.push(item.product.cartId);
    } else if (item.type === '2') {
      ids.push(item.cartId);
    }
  });
  return ids;
}

/**
 * 获取商品类型
 */
export function getCartGoods(params) {
  return {
    types: [GET_CART_GOODS, GET_CART_GOODS_SUCCESS, GET_CART_GOODS_FAILURE],
    promise: client => client.post(`/biz/std_mendian/shoppingCart/client/v1/list.action`, {
      data: params
    })
  };
}

/**
 * 修改选中状态
 */
export function checkChange(checked, cartId) {
  return dispatch => {
    dispatch({
      type: CHECK_CHANGE,
      checked,
      cartId
    });
  };
}

/**
 * 全选
 */
export function checkAllChange(checked) {
  return dispatch => {
    dispatch({
      type: CHECK_ALL_CHANGE,
      checked
    });
  };
}

/**
 * 删除全选
 */
export function checkAllDelete(checked) {
  return (dispatch, getState) => {
    const items = getState().cart.items.slice();
    const newItems = resetAllDelItems(items, checked);
    dispatch({
      type: CHECK_ALL_DELETE,
      items: newItems,
      checkAllDel: checked
    });
  };
}

/**
 * 改变商品数量
 */
export function countChange(count, cartId) {
  return dispatch => {
    dispatch({
      type: COUNT_CHANGE,
      count,
      cartId
    });
  };
}

/**
 * 修改购物车数量服务器请求
 */
export function countChangeReq(params) {
  return {
    types: [COUNT_CHANGE_REQ, COUNT_CHANGE_REQ_SUCCESS, COUNT_CHANGE_REQ_FAILURE],
    promise: client => client.post(`/biz/std_mendian/shoppingCart/client/v1/updateCount.action`, {
      data: params
    })
  };
}

/**
 * 编辑状态改变
 */
export function editChange(isEdit) {
  return dispatch => {
    dispatch({
      type: EDIT_CHANGE,
      isEdit
    });
  };
}

/**
 * 删除购物车
 */
export function deleteGoods(params) {
  return {
    types: [DELETE_GOODS, DELETE_GOODS_SUCCESS, DELETE_GOODS_FAILURE],
    promise: client => client.post(`/biz/std_mendian/shoppingCart/client/v1/delete.action`, {
      data: params
    })
  };
}

/**
 * 获取购物车数量
 */
export function getCartCount() {
  return {
    types: [GET_CART_COUNT, GET_CART_COUNT_SUCCESS, GET_CART_COUNT_FAILURE],
    promise: client => client.post(`/biz/std_mendian/shoppingCart/client/v1/queryCount.action`)
  };
}

/**
 * 再次购买
 */
export function buyAgain(cartIds) {
  return (dispatch, getState) => {
    const items = resetBuyAgainItems(getState().cart.items.slice(), cartIds);
    const totalObject = getTotal(items);
    const total = totalObject.total;
    const totalPrice = totalObject.totalPrice;
    const checkAll = totalObject.checkAll;
    dispatch({
      type: BUY_AGAIN,
      items,
      total,
      totalPrice,
      checkAll
    });
  };
}


