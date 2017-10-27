import { dateFormat } from 'utils/utils';

// 加入购物车
const SUBMIT_COMMENT = 'comment/SUBMIT_COMMENT';
const SUBMIT_COMMENT_SUCCESS = 'comment/SUBMIT_COMMENT_SUCCESS';
const SUBMIT_COMMENT_FAILURE = 'comment/SUBMIT_COMMENT_FAILURE';

// 服务评分
const SET_GRADE = 'comment/SET_GRADE';

// 输入内容
const CONTENT_CHANGE = 'comment/CONTENT_CHANGE';

// 添加照片
const ADD_IMAGE = 'comment/ADD_IMAGE';

// 删除照片
const DELETE_IMAGE = 'comment/DELETE_IMAGE';

// 设置经纬度
const SET_LOCATION = 'comment/SET_LOCATION';

// 初始化数据
const INIT_DATA = 'comment/INIT_DATA';

const initial = {
  star: 5, // 评分
  content: '', // 内容
  latitude: '',
  longitude: '',
  imgIds: [],
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case INIT_DATA:
      return {
        ...state,
        star: 5, // 评分
        content: '', // 内容
        latitude: '',
        longitude: '',
        imgIds: [],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
      };
    case SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
      };
    case SET_GRADE:
      return {
        ...state,
        star: action.star
      };
    case CONTENT_CHANGE:
      return {
        ...state,
        content: action.content
      };
    case ADD_IMAGE:
      return {
        ...state,
        imgIds: action.imgIds
      };
    case DELETE_IMAGE:
      return {
        ...state,
        imgIds: action.imgIds
      };
    case SET_LOCATION:
      return {
        ...state,
        latitude: action.longitude,
        longitude: action.longitude
      };
    default:
      return state;
  }
}

/**
 * 提交评价
 */
export function submitComment(params) {
  return {
    types: [SUBMIT_COMMENT, SUBMIT_COMMENT_SUCCESS, SUBMIT_COMMENT_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/submitReview.action`, {
      data: params
    })
  };
}

/**
 * 服务评分
 */
export function setGrade(num) {
  return dispatch => {
    dispatch({
      type: SET_GRADE,
      star: num
    });
  };
}

/**
 * 添加图片
 */
export function addImage(imgIds) {
  return (dispatch, getState) => {
    const newImgIds = getState().comment.imgIds.slice().concat(imgIds);
    dispatch({
      type: ADD_IMAGE,
      imgIds: newImgIds
    });
  };
}

/**
 * 删除图片
 */
export function deleteImage(index) {
  return (dispatch, getState) => {
    const imgIds = getState().comment.imgIds.slice();
    // 删除图片
    imgIds.splice(index, 1);
    dispatch({
      type: DELETE_IMAGE,
      imgIds: imgIds
    });
  };
}

/**
 * 输入内容
 */
export function contentChange(content) {
  return dispatch => {
    dispatch({
      type: CONTENT_CHANGE,
      content
    });
  };
}

/**
 * 设置经纬度
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 */
export function setLocation(latitude, longitude) {
  return dispatch => {
    dispatch({
      type: SET_LOCATION,
      latitude,
      longitude
    });
  };
}

/**
 * 重置数据
 */
export function initData() {
  return dispatch => {
    dispatch({
      type: INIT_DATA,
    });
  };
}

/**
 * 获取带前缀的图片
 */
export function getPrefixImgs(imgIds) {
  return imgIds.map((imgId) => {
    return 'LocalResource://imageid' + imgId;
  });
}

/**
 * 获取上传图片路径
 */
export function getUploadDir() {
  const month = dateFormat(new Date(), 'yyyyMM');
  return `std_mendian/order_view/${month}/`;
}

/**
 * 获取带前缀的图片
 */
export function getUploadImgs(imgIds) {
  return imgIds.map((imgId) => {
    return getUploadDir() + imgId;
  });
}


