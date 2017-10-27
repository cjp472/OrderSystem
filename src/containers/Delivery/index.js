import React, {PropTypes} from 'react';
import Navigate from 'components/Navigate';
import Attributes from '../Order/Attributes';
import styled from 'styled-components';
import Drop from './drop.png';
import Retract from './retract.png';
import GoodItem from './GoodItem';
import Load from 'components/Load';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { getSentRecords, changeRecordStatus } from 'redux/modules/delivery';
import { setBackEnable } from 'utils/WqJsBridge';

const Root = styled.div`
  padding-top: 44px;
`;

const Head = styled.div`
  padding: 0 12px;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #000;
  display: flex;
  align-items: center;
  background-color: #FFF;
  margin-top: 10px;
`;

const Count = styled.div`
  flex: 1;
  color: #999;
  text-align: right;
  padding-right: 12px;
`;

const Arrow = styled.img`
  width: 13px;
`;

const Card = styled.div`
  margin-top: 10px;
`;

@connect(state => ({
  sentRecords: state.delivery.sentRecords,
  isLoading: state.delivery.isLoading,
}), {
  getSentRecords,
  changeRecordStatus,
  goBack,
})
export default class Delivery extends React.Component {
  static propTypes = {
    sentRecords: PropTypes.array,
    getSentRecords: PropTypes.func,
    changeRecordStatus: PropTypes.func,
    goBack: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { type, orderId, tenantId } = this.props.params; // eslint-disable-line
    const params = {
      em_order_type: type,
      order_id: orderId,
      tenant_id: tenantId
    };
    this.props.getSentRecords(params).then((result) => {
      if (result.code !== '1') {
        alert('发货记录请求失败，请稍后重试');
      }
    });
    // 注册给客户端调用的返回事件
    try {
      setBackEnable(true);
    } catch (error) {
      console.log(error);
    }
    window.addEventListener('onBackPress', this.props.goBack);
  }

  componentWillUnmount() {
    try {
      setBackEnable(false);
    } catch (error) {
      console.log(error);
    }
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  changeRecordStatus = (id) => {
    this.props.changeRecordStatus(id);
  }

  render() {
    const { sentRecords, isLoading } = this.props;
    const { type } = this.props.params; // eslint-disable-line
    const isHideSign = type === 'PSI'; // 商贸版不显示签收数量
    return (
      <Root>
        <Navigate title="发货记录"/>
        {sentRecords.map((sentRecord, index) => {
          return (sentRecord && <Card key={index}>
              <Attributes items={sentRecord.items} />
              <Head>
                {'商品清单'}
                <Count>{sentRecord.total}</Count>
                <Arrow onClick={() => this.changeRecordStatus(sentRecord.id)} src={sentRecord.isClosed ? Retract : Drop} />
              </Head>
              {
                !sentRecord.isClosed && sentRecord.stocks.map((stock, key) => (
                  <GoodItem item={stock} key={key} isHideSign={isHideSign}/>
                ))
              }
            </Card>);
        })}
        {isLoading && <Load />}
      </Root>
    );
  }
}
