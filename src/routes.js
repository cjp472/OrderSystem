import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    NotFound,
    Home,
    Goods,
    Search,
    Detail,
    Slide,
    Cart,
    Promotion,
    PromotionDetail,
    CountInput,
    Order,
    OrderDetail,
    OrderConfirm,
    OrderSuccess,
    OrderSearch,
    Stock,
    StockSelect,
    Delivery,
    Comment
  } from 'containers';

const change = (prevState, nextState, replace, callback) => {
  window._react_page_action = nextState.location.action;
  callback();
};

export default () => {
  return (
    <Route path="_react_" onChange={change} component={App}>
      <IndexRoute component={Home}/>
      <Route path="goods">
        {/* 商品列表 */}
        <IndexRoute component={Goods} />
        {/* 商品搜索 */}
        <Route path="search" component={Search}/>
        <Route>
          {/* 商品详情 */}
          <Route path="detail(/:id)" component={Detail}/>
          {/* 加入购物车 */}
          <Route path="slide" component={Slide}/>
          {/* 促销列表 */}
          <Route path="promotion(/:id)" component={Promotion}/>
          {/* 促销详情 */}
          <Route path="pdetail(/:type)(/:id)" component={PromotionDetail}/>
          <Route path="input" component={CountInput}/>
        </Route>
      </Route>
      <Route path="cart">
        {/* 购物车 */}
        <IndexRoute component={Cart}/>
        {/* 订单确认 */}
        <Route path="confirm(/:id)" component={OrderConfirm}/>
        {/* 订单成功 */}
        <Route path="success" component={OrderSuccess}/>
      </Route>
      <Route path="order">
        {/* 订单列表 */}
        <IndexRoute component={Order}/>
        {/* 订单详情 */}
        <Route path="detail(/:type)(/:orderId)(/:tenantId)(/:customerId)(/:supplierId)" component={OrderDetail}/>
        {/* 订单搜索 */}
        <Route path="search" component={OrderSearch}/>
      </Route>
      <Route path="stock">
        {/* 签收入库 */}
        <Route path="confirm(/:type)(/:orderId)(/:tenantId)(/:customerId)(/:supplierId)" component={Stock} />
        {/* 仓库选择 */}
        <Route path="select(/:id)" component={StockSelect}/>
      </Route>
      <Route path="delivery">
        {/* 发货记录 */}
        <Route path="list(/:type)(/:orderId)(/:tenantId)" component={Delivery}/>
      </Route>
      <Route path="comment">
        {/* 签收评价 */}
        <Route path="detail(/:type)(/:orderId)(/:tenantId)(/:customerId)(/:supplierId)" component={Comment}/>
      </Route>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
