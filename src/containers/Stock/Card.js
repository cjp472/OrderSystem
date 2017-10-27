import React, { Component, PropTypes } from 'react';
import Company from '../OrderDetail/Company';
import Warehouse from './Warehouse';
import Total from './Total';
import Item from './Item';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const Contaienr = styled.div`
  margin-top: 10px;
  background: #fff;
`;


@connect(null, {
  pushState: push
})
export default class Card extends Component {
  static propTypes = {
    record: PropTypes.object,
    countChange: PropTypes.func,
    pushState: PropTypes.func,
    onConfirm: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  onConfirm = () => {
    const { id, storeId } = this.props.record;
    this.props.onConfirm(id, storeId);
  }

  goStockSelect = () => {
    const { id } = this.props.record;
    this.props.pushState(`/_react_/stock/select/${id}`);
  }

  render() {
    const { record } = this.props;
    return (
      <div>
        <Contaienr>
          <Company name={record.supplier} />
          <Warehouse isSign={record.isSign} sentTime={record.sentTime} storeName={record.storeName} goStockSelect={this.goStockSelect}/>
          {
            record.stocks && record.stocks.map((stock, index) => (
              <Item key={index} id={record.id} item={stock} isSign={record.isSign} countChange={this.props.countChange}/>
            ))
          }
          <Total num={record.signCount} label="确认" isSign={record.isSign} onConfirm={this.onConfirm}/>
        </Contaienr>
      </div>
    );
  }
}
