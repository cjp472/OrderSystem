// 促销列表服务端请求
const GET_PROMOTIONS = 'promotion/GET_PROMOTIONS';
const GET_PROMOTIONS_SUCCESS = 'promotion/GET_PROMOTIONS_SUCCESS';
const GET_PROMOTIONS_FAILURE = 'promotion/GET_PROMOTIONS_FAILURE';

// 促销详情服务端请求
const GET_PROMOTIONS_DETAIL = 'promotion/GET_PROMOTIONS_DETAIL';
const GET_PROMOTIONS_DETAIL_SUCCESS = 'promotion/GET_PROMOTIONS_DETAIL_SUCCESS';
const GET_PROMOTIONS_DETAIL_FAILURE = 'promotion/GET_PROMOTIONS_DETAIL_FAILURE';

// 加入购物车
const ADD_IN_CART = 'promotion/ADD_IN_CART';
const ADD_IN_CART_SUCCESS = 'promotion/ADD_IN_CART_SUCCESS';
const ADD_IN_CART_FAILURE = 'promotion/ADD_IN_CART_FAILURE';


const initial = {
  priceVisible: true, // 是否显示价格
  promotions: [], // 促销列表
  gifts: [], // 赠品
  products: [], // 商品
  promotionInfo: {},  // 促销信息
  isLoading: true,
  isDetailLoading: false, // 加载中
};

const convertPrice = (price, priceVisible) => {
  const priceStr = price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  if (priceVisible && priceStr) {
    return '¥' + priceStr;
  }
  return null;
};

const convertPromotions = (promotions, priceVisible) => {
  return promotions.map((promotion) => {
    return {
      id: promotion.promotion_id,
      type: promotion.promotion_type,
      title: promotion.name,
      labels: [
        {
          label: '促销价：',
          text: promotion.promotion_type === 'zh' ? convertPrice(promotion.price, priceVisible) : ''
        },
        {
          label: '结束日期：',
          text: promotion.end_date
        }
      ]
    };
  });
};

const convertPromotionInfo = (promotionInfo) => {
  return {
    header: promotionInfo.promotion_type === 'mz' ? '买赠促销' : '组合促销',
    id: promotionInfo.promotion_id,
    type: promotionInfo.promotion_type,
    price: promotionInfo.price,
    title: promotionInfo.name,
    labels: [
      {
        label: '结束日期：',
        text: promotionInfo.end_date
      },
      {
        label: '活动内容：',
        text: promotionInfo.promotion_type === 'mz' ? promotionInfo.calc_mode_text : ''
      }
    ]
  };
};

const convertProducts = (products) => {
  return products.map((product) => {
    const num = product.num && 'X' + product.num + product.unit;
    return {
      brand: product.brand, // 品牌
      code: product.code, // 商品编码
      name: product.name, // 商品名称
      spec: product.name_spec, // 规格属性
      title: product.name + ' ' + ( product.spec || '' ), // 列表显示title
      id: product.pd_id, // 商品Id
      picUrl: product.picture, // 商品图片地址
      price: product.price, // 商品价格
      subtitle: product.prop_values, // 属性
      num
    };
  });
};

const convertGifts = (products) => {
  return products.map((product) => {
    const num = product.num && 'X' + product.num + product.unit;
    return {
      brand: product.brand, // 品牌
      code: product.code, // 商品编码
      name: product.name, // 商品名称
      spec: product.name_spec, // 规格属性
      title: product.name + ' ' + ( product.spec || '' ), // 列表显示title
      id: product.pd_id, // 商品Id
      picUrl: product.picture, // 商品图片地址
      subtitle: product.prop_values, // 属性
      num
    };
  });
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_PROMOTIONS:
      return {
        ...state,
        promotions: [],
        isLoading: true,
      };
    case GET_PROMOTIONS_SUCCESS:
      const list = action.result && action.result.data;
      const priceVisible = ( list && list.price_visible ) === '1' ? true : false;
      const promotions = convertPromotions(list && list.promotions, priceVisible);
      return {
        ...state,
        priceVisible: priceVisible,
        isLoading: false,
        promotions
      };
    case GET_PROMOTIONS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case GET_PROMOTIONS_DETAIL:
      return {
        ...state,
        isDetailLoading: true,
      };
    case GET_PROMOTIONS_DETAIL_SUCCESS:
      const detail = action.result && action.result.data;
      const gifts = convertGifts(detail && detail.gifts);
      const products = convertProducts(detail && detail.products);
      const promotionInfo = convertPromotionInfo(detail && detail.promotionInfo);
      // 存在直接进入详情的页面
      const priceVisible2 = ( detail && detail.price_visible ) === '1' ? true : false;
      return {
        ...state,
        gifts,
        products,
        promotionInfo,
        priceVisible: priceVisible2,
        isDetailLoading: false
      };
    case GET_PROMOTIONS_DETAIL_FAILURE:
      return {
        ...state,
        isDetailLoading: false
      };
    case ADD_IN_CART:
      return {
        ...state
      };
    case ADD_IN_CART_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}

/**
 * 获取促销列表
 */
export function getPromotions(params) {
  return {
    types: [GET_PROMOTIONS, GET_PROMOTIONS_SUCCESS, GET_PROMOTIONS_FAILURE],
    promise: client => client.post(`/biz/std_mendian/pd/client/v1/queryPromotions.action`, {
      data: params
    })
  };
}

/**
 * 获取促销详情
 */
export function getPromotionDetail(params) {
  return {
    types: [GET_PROMOTIONS_DETAIL, GET_PROMOTIONS_DETAIL_SUCCESS, GET_PROMOTIONS_DETAIL_FAILURE],
    promise: client => client.post(`/biz/std_mendian/pd/client/v1/queryPromotionInfo.action`, {
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
