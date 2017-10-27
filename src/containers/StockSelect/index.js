import React, { Component, PropTypes } from 'react';
import Navigate from 'components/Navigate';
import styled from 'styled-components';
import ok from 'components/icons/ok.png';
import { connect } from 'react-redux';
import { goBack, push } from 'react-router-redux';
import { getStoreHouses, onSelectHouse } from 'redux/modules/stock';
import { setBackEnable } from 'utils/WqJsBridge';

const Root = styled.div`
  background: #fff;
  padding-top: 44px;
  padding-left: 12px;
  box-shadow: 0 1px 0 0 #E5E5E5;
`;

const Item = styled.div`
  height: 44px;
  box-sizing: border-box;
  box-shadow: 0 1px 0 0 #E5E5E5;
  padding: 10px 0;
`;

const Icon = styled.img`
  width: 16px;
  margin-top: 6px;
  margin-right: 12px;
  float: right;
`;

@connect(state => ({
  storeHouses: state.stock.storeHouses,
}), {
  getStoreHouses,
  onSelectHouse,
  goBack,
  pushState: push
})
export default class StockSelect extends Component {
  static propTypes = {
    onSelectHouse: PropTypes.func,
    getStoreHouses: PropTypes.func,
    storeHouses: PropTypes.array,
    goBack: PropTypes.func,
    pushState: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { id } = this.props.params; // eslint-disable-line
    this.props.getStoreHouses(id);
    // 注册给客户端调用的返回事件
    setBackEnable(true);
    window.addEventListener('onBackPress', this.props.goBack);
  }

  componentWillUnmount() {
    setBackEnable(false);
    window.removeEventListener('onBackPress', this.props.goBack);
  }

  onSelect = (itemId) => {
    const { id } = this.props.params; // eslint-disable-line
    const { storeHouses } = this.props;
    const newStoreHouses = storeHouses.map((storeHouse) => {
      return {
        ...storeHouse,
        selected: storeHouse.id === itemId ? true : false
      };
    });
    this.props.onSelectHouse(id, newStoreHouses);
    setTimeout(() => {
      this.props.goBack();
    }, 0);
  }

  render() {
    const { storeHouses } = this.props;
    return (
      <Root>
        <Navigate title="仓库"/>
        {storeHouses.map((item, index) => <Item onClick={() => this.onSelect(item.id)} key={index}>{item.name} {item.selected && <Icon src={ok}/>} </Item>)}
      </Root>
    );
  }
}
