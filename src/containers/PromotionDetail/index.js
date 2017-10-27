import React, {PropTypes} from 'react';
import PromotionItem from 'containers/Promotion/PromotionItem';
import GoodItem from 'containers/Goods/Main/GoodItem';
import Navigate from 'components/Navigate';
import Footer from './Footer';
import styled from 'styled-components';
import Toast from 'components/Toast';
import Load from 'components/Load';
import { connect } from 'react-redux';
import { getPromotionDetail, addInCart } from 'redux/modules/promotion';
import {getCartCount} from 'redux/modules/cart';
import { goBack } from 'react-router-redux';

const Container = styled.div`
  padding-top: 54px;
  margin-bottom: 50px;
`;

const Description = styled.div`
  background-color: #FFF;
  border-top: 1px solid #f0f1f2;
`;

const Header = styled.div`
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  font-size: 14px;
  color: #333;
  background-color: #FFF;
  border-top: 1px solid #f0f1f2;
  border-bottom: 1px solid #f0f1f2;
  margin-top: -1px;
`;

const Gifts = styled.div`
  margin-top: 10px;
  border-top: 1px solid #f0f1f2;
  border-bottom: 1px solid #f0f1f2;
  background-color: #FFF;
`;

const Goods = styled.div`
  margin-top: 10px;
  border-top: 1px solid #f0f1f2;
  border-bottom: 1px solid #f0f1f2;
  background-color: #FFF;
`;

const Count = styled.span`
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 12px;
  color: #999;
`;

@connect(state => ({
  priceVisible: state.promotion.priceVisible,
  gifts: state.promotion.gifts,
  products: state.promotion.products,
  promotionInfo: state.promotion.promotionInfo,
  isDetailLoading: state.promotion.isDetailLoading,
}), {
  getPromotionDetail,
  getCartCount,
  addInCart,
  goBack
})

export default class PromotionDetail extends React.Component {
  static propTypes = {
    priceVisible: PropTypes.bool,
    gifts: PropTypes.array,
    products: PropTypes.array,
    promotionInfo: PropTypes.object,
    getPromotionDetail: PropTypes.func,
    addInCart: PropTypes.func,
    isDetailLoading: PropTypes.bool,
    getCartCount: PropTypes.func,
    goBack: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      toastShow: false
    };
  }

  componentDidMount() {
    const { type, id } = this.props.params; // eslint-disable-line
    const params = {
      promotion_id: id,
      promotion_type: type
    };
    this.props.getPromotionDetail(params).then((result) => {
      if (result.code !== '1') {
        alert('促销详情获取失败，请稍后重试');
      }
    });
    // 注册给客户端调用的返回事件
    window.addEventListener('onBackPress', this.props.goBack);
  }

  componentWillUnmount() {
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  countChange = (value) => {
    const { type, id } = this.props.params; // eslint-disable-line
    const params = {
      zh_promotion_id: id,
      item_count: value,
      item_type: '2'
    };
    this.props.addInCart(params).then((result) => {
      if (result.code === '1') {
        this.setState({toastShow: true});
        setTimeout(() => {
          this.setState({toastShow: false});
        }, 300);
        this.props.getCartCount();
      } else {
        alert('加入购物车失败，请稍后重试');
      }
    });
  }

  render() {
    const { promotionInfo, gifts, products, priceVisible, isDetailLoading } = this.props;
    const { toastShow } = this.state;
    return (
        <div>
          <Navigate title={promotionInfo && promotionInfo.header} />
          {!isDetailLoading &&
          <Container>
            <Description>
                <PromotionItem labels={promotionInfo.labels} title={promotionInfo.title} />
            </Description>
            {products && <Goods>
              <Header>促销品</Header>
              {products.map((product, index) => {
                return (
                  <GoodItem
                    key={index}
                    id={product.id}
                    img={product.picUrl}
                    title={product.title}
                    subtitle={product.subtitle}
                    price={priceVisible ? product.price : null}
                  >
                    <Count>{product.num}</Count>
                  </GoodItem>
                );
              })
              }
            </Goods>}
            {gifts &&
            <Gifts>
              <Header>赠品</Header>
              {gifts.map((gift, index) => {
                return (
                  <GoodItem
                    key={index}
                    id={gift.id}
                    img={gift.picUrl}
                    title={gift.title}
                    subtitle={gift.subtitle}
                    price={priceVisible ? gift.price : null}
                  >
                    <Count>{gift.num}</Count>
                  </GoodItem>
                );
              })
              }
            </Gifts>}
          </Container>}
          {!isDetailLoading && promotionInfo && promotionInfo.type === 'zh'
            && <Footer
              priceVisible={priceVisible}
              price={promotionInfo.price}
              countChange={this.countChange}
            /> }
          <Toast show={toastShow} title={'加入购物车成功'} />
          {isDetailLoading && <Load />}
        </div>
    );
  }
}
