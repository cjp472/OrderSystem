import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';
import goods from './goods';
import detail from './detail';
import search from './search';
import promotion from './promotion';
import cart from './cart';
import order from './order';
import orderSearch from './orderSearch';
import orderDetail from './orderDetail';
import orderConfirm from './orderConfirm';
import stock from './stock';
import delivery from './delivery';
import comment from './comment';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  goods,
  detail,
  search,
  promotion,
  cart,
  order,
  orderSearch,
  orderDetail,
  orderConfirm,
  stock,
  delivery,
  comment,
});
