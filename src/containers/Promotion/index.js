import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Navigate from 'components/Navigate';
import PromotionItem from './PromotionItem';
import right from './right.png';
import noGoods from 'components/icons/noGoods.png';
import NoData from 'components/NoData';
import { connect } from 'react-redux';
import { getPromotions } from 'redux/modules/promotion';
import { push, goBack } from 'react-router-redux';
import Load from 'components/Load';

const Container = styled.div`
  padding-top: 54px;
  border-top: 1px solid #f0f1f2;
  border-bottom: 1px solid #f0f1f2;
`;

const Icon = styled.img`
  width: 8px;
  height: 13px;
  position: absolute;
  top: 50%;
  margin-top: -6px;
  right: 12px;
`;

@connect(state => ({
  promotions: state.promotion.promotions,
  isLoading: state.promotion.isLoading,
}), {
  getPromotions,
  pushState: push,
  goBack
})

export default class Promotion extends React.Component {
  static propTypes = {
    promotions: PropTypes.array,
    getPromotions: PropTypes.func,
    pushState: PropTypes.func,
    goBack: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.params; //eslint-disable-line
    this.props.getPromotions({pd_id: id}).then((result) => {
      if (result.code !== '1') {
        alert('促销列表获取失败，请稍后重试');
      }
    });
    // 注册给客户端调用的返回事件
    window.addEventListener('onBackPress', this.props.goBack);
  }

  componentWillUnmount() {
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  goDetail = (url) => {
    this.props.pushState(url);
  }

  render() {
    const { promotions, isLoading } = this.props;
    return (
      <div>
        <Navigate title="促销优惠" />
        <Container>
          {promotions && promotions.map((item) => {
            return (<PromotionItem key={item.id} id={item.id} type={item.type} labels={item.labels} title={item.title} goDetail={this.goDetail}>
                      <Icon src={right} />
                   </PromotionItem>);
          })}
        </Container>
        {(!isLoading && promotions.length === 0) ? <NoData text={'暂无数据'} img={noGoods} /> : null}
        {isLoading && <Load />}
      </div>
    );
  }
}
