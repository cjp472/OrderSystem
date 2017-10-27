import { generateUUID } from 'utils/utils';
// 获取商品类型服务端请求
const GET_CART_GOODS = 'orderConfirm/GET_CART_GOODS';
const GET_CART_GOODS_SUCCESS = 'orderConfirm/GET_CART_GOODS_SUCCESS';
const GET_CART_GOODS_FAILURE = 'orderConfirm/GET_CART_GOODS_FAILURE';

// 提交订单
const SUBMIT_ORDER = 'orderConfirm/SUBMIT_ORDER';
const SUBMIT_ORDER_SUCCESS = 'orderConfirm/SUBMIT_ORDER_SUCCESS';
const SUBMIT_ORDER_FAILURE = 'orderConfirm/SUBMIT_ORDER_FAILURE';

const SET_DELIVERY_DATE = 'orderConfirm/SET_DELIVERY_DATE';

const SET_MESSAGE = 'orderConfirm/SET_MESSAGE';

// 查询默认地址
const GET_DEFAULT_ADDR = 'orderConfirm/GET_DEFAULT_ADDR';
const GET_DEFAULT_ADDR_SUCCESS = 'orderConfirm/GET_DEFAULT_ADDR_SUCCESS';
const GET_DEFAULT_ADDR_FAILURE = 'orderConfirm/GET_DEFAULT_ADDR_FAILURE';

// 根据ID查询地址
const GET_ADDR_BY_ID = 'orderConfirm/GET_ADDR_BY_ID';
const GET_ADDR_BY_ID_SUCCESS = 'orderConfirm/GET_ADDR_BY_ID_SUCCESS';
const GET_ADDR_BY_ID_FAILURE = 'orderConfirm/GET_ADDR_BY_ID_FAILURE';

// 生成UUID
const GENERATE_UUID = 'orderConfirm/GENERATE_UUID';

const dateFormat = (date, formatStr) => {
  let fmt = formatStr;
  const obj = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[key]) : (('00' + obj[key]).substr(('' + obj[key]).length)));
    }
  }
  return fmt;
};

const initial = {
  customer: '', // 客户名称
  deliveryDate: dateFormat(new Date(), 'yyyy-MM-dd'), // 交货日期
  message: '', // 留言
  priceVisible: true, // 是否显示价格
  addressId: '', // 地址ID
  address: '', // 地址
  name: '', // 姓名
  phone: '', // 手机号码
  tel: '', // 电话
  gifts: null, // 买赠促销叠加促销赠品
  items: null,
  totalPrice: '0',
  isLoading: true,
  isSubmit: false,
  uuid: ''
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
      picUrl: gift.small_pic,
      tip: 'X' + gift.item_count + gift.unit_name,
    };
  });
};

const convertItems = (items) => {
  return items.map((item) => {
    if (item.item_type === '2') { // 组合促销
      return {
        type: item.item_type,
        id: item.zh_promotion.id,
        count: item.zh_promotion.item_count,
        title: item.zh_promotion.name,
        price: item.zh_promotion.price,
        cartId: item.zh_promotion.shopping_cart_item_id,
        numberInfo: 'X' + item.zh_promotion.item_count + '组',
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
  return gifts && gifts.map((gift) => {
    return {
      id: gift.id,
      type: '3',
      title: gift.rule,
      products: convertGifts(gift.products)
    };
  });
};

const getTotal = (items) => {
  let totalPrice = 0; // 选中商品总价
  items.forEach((item) => {
    if (item.type === '1') {
      totalPrice = totalPrice + item.product.count * Number(item.product.price);
    } else if (item.type === '2') {
      totalPrice = totalPrice + item.count * Number(item.price);
    } else if (item.type === '3') {
      item.products.forEach((product) => {
        totalPrice = totalPrice + product.count * Number(product.price);
      });
    }
  });
  return {
    totalPrice: String(totalPrice)
  };
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
      // 总价,总数,全部选中
      const { totalPrice } = getTotal(items);
      return {
        ...state,
        customer: data.customer_name,
        supplier: data.supplier_name,
        priceVisible: data.price_visible === '1' ? true : false,
        isLoading: false,
        deliveryDate: dateFormat(new Date(), 'yyyy-MM-dd'), // 交货日期
        message: '', // 留言
        items,
        gifts,
        totalPrice,
      };
    case GET_CART_GOODS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case SET_DELIVERY_DATE:
      return {
        ...state,
        deliveryDate: action.date
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case SUBMIT_ORDER:
      return {
        ...state,
        isSubmit: true,
      };
    case SUBMIT_ORDER_SUCCESS:
      return {
        ...state,
        isSubmit: false,
      };
    case SUBMIT_ORDER_FAILURE:
      return {
        ...state,
        isSubmit: false,
      };
    case GET_DEFAULT_ADDR:
      return {
        ...state
      };
    case GET_DEFAULT_ADDR_SUCCESS:
      const addressData = action.result && action.result.data;
      return {
        ...state,
        addressId: addressData.id,
        name: addressData.receive_name,
        phone: addressData.receive_phone,
        tel: addressData.receive_tel,
        address: (addressData.province || '') + (addressData.city || '') + (addressData.area || '') + (addressData.receive_addr || '')
      };
    case GET_ADDR_BY_ID:
      return {
        ...state
      };
    case GET_ADDR_BY_ID_SUCCESS:
      const addressDataById = action.result && action.result.data;
      return {
        ...state,
        addressId: addressDataById.id,
        name: addressDataById.receive_name,
        phone: addressDataById.receive_phone,
        tel: addressDataById.receive_tel,
        address: (addressDataById.province || '') + (addressDataById.city || '') + (addressDataById.area || '') + (addressDataById.receive_addr || '')
      };
    case GENERATE_UUID:
      return {
        ...state,
        uuid: generateUUID(),
      };
    default:
      return state;
  }
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
 * 重新设置交货日期
 */
export function setDeliveryDate(date) {
  return dispatch => {
    dispatch({
      type: SET_DELIVERY_DATE,
      date
    });
  };
}

/**
 * 重新设置留言
 */
export function setMessage(message) {
  return dispatch => {
    dispatch({
      type: SET_MESSAGE,
      message
    });
  };
}

/**
 * 生成UUID
 */
export function generateUniqueId() {
  return dispatch => {
    dispatch({
      type: GENERATE_UUID
    });
  };
}

/**
 * 获取默认地址
 */
export function getDefaultAddr() {
  return {
    types: [GET_DEFAULT_ADDR, GET_DEFAULT_ADDR_SUCCESS, GET_DEFAULT_ADDR_FAILURE],
    promise: client => client.post(`/address/queryDefault.action`)
  };
}

/**
 * 根据Id获取地址
 */
export function getAddrById(params) {
  return {
    types: [GET_ADDR_BY_ID, GET_ADDR_BY_ID_SUCCESS, GET_ADDR_BY_ID_FAILURE],
    promise: client => client.get(`/address/queryById.action?id=${params.id}`)
  };
}

/**
 * 提交订单
 */
export function submitOrder(params, uuid) {
  return {
    types: [SUBMIT_ORDER, SUBMIT_ORDER_SUCCESS, SUBMIT_ORDER_FAILURE],
    promise: client => client.post(`/biz/std_mendian/shoppingCart/client/v1/saveOrder.action`, {
      data: params,
      head: {'_stoken_': uuid}
    })
  };
}

const resetGifts = (gifts) => {
  return gifts.map((gift) => {
    return {
      item_count: gift.count,
      pd_name: gift.title,
      pd_id: gift.id,
      unit_id: gift.unitId,
      unit_name: gift.unit,
      small_pic: gift.picUrl
    };
  });
};

const resetOverLapGifts = (gifts) => {
  return gifts && gifts.map((gift) => {
    return {
      id: gift.id,
      products: resetGifts(gift.products)
    };
  });
};

const resetProduct = (product) => {
  return {
    is_gift: product.isGift ? '1' : '0',
    item_count: product.count,
    pd_id: product.id,
    pd_name: product.title,
    price: product.price,
    shopping_cart_item_id: product.cartId,
    small_pic: product.picUrl,
    unit_id: product.unitId,
    unit_name: product.unit_name
  };
};

const resetProducts = (products) => {
  return products.map((product) => {
    return resetProduct(product);
  });
};

const resetItems = (items) => {
  return items.map((item) => {
    if (item.type === '2') { // 组合促销
      return {
        item_type: item.type,
        zh_promotion: {
          id: item.id,
          item_count: item.count,
          price: item.price,
          shopping_cart_item_id: item.cartId,
          products: resetProducts(item.products),
        }
      };
    } else if (item.type === '3') { // 买赠促销
      return {
        item_type: item.type,
        mz_promotion: {
          id: item.id,
          promotion_products: resetProducts(item.products),
          promotion_gifts: resetGifts(item.gifts),
        }
      };
    } else if (item.type === '1') { // 普通商品
      return {
        item_type: item.type,
        pd_info: resetProduct(item.product)
      };
    }
  });
};

export function getSubmitParams(info, gifts, items) {
  return {
    address: {
      id: info.addressId,
      receive_full_addr: info.address,
      receive_name: info.name,
      receive_phone: info.phone,
      receive_tel: info.tel
    },
    consignment_date: info.deliveryDate,
    mz_promotion_overlaps: resetOverLapGifts(gifts),
    remark: info.message,
    shopping_cart_items: resetItems(items)
  };
}


