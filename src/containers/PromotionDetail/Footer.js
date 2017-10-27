import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Cart from './Cart';
import Price from 'components/Price';
import RedButton from 'containers/Detail/Footer/RedButton';
import PromptDialog from 'containers/CountInput/PromptDialog';

const Contaienr = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #FFF;
  border-top: 1px solid #f0f1f2;
  display: flex;
  box-sizing: border-box;
  padding: 0 12px;
`;

const SetMealPrice = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 160px;
`;

const Label = styled.span`
  color: #000;
  font-size: 14px;
`;

const MealPrice = styled.div`
  display: inline-block;
`;

export default class Footer extends React.Component {
  static propTypes = {
    price: PropTypes.string,
    priceVisible: PropTypes.bool,
    countChange: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: 1
    };
  }

  showPrompt = () => {
    this.myPortal.openPortal();
  }

  hidePrompt = () => {
    this.setState({show: false});
  }

  confirmCount = (value) => {
    const { min, max } = this.props;
    let curValue = value;
    if (value <= min) { // 如果value小于最小值,则设置为最小值，同时active为false
      curValue = min;
    }
    if (value > max) {
      curValue = max;
    }
    this.setState({value: curValue, show: false });
    this.props.countChange(curValue);
  }

  render() {
    const { price, priceVisible } = this.props;
    const { show, value } = this.state;
    return (
      <Contaienr>
        <Cart />
        {priceVisible &&
        <SetMealPrice>
          <Label>套餐价：</Label>
          <MealPrice>
            <Price price={price} />
          </MealPrice>
        </SetMealPrice>}
        <RedButton addInCart={this.showPrompt}>加入购物车</RedButton>
        <PromptDialog portRef={el => this.myPortal = el} show={show} value={value} hidePrompt={this.hidePrompt} confirmCount={this.confirmCount}/>
      </Contaienr>
    );
  }
}
