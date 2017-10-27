/**
 * 组合促销
 */
import React, {PropTypes} from 'react';
import Promotion from './Promotion';
import CombineItem from './CombineItem';

export default class CombineGoods extends React.Component {
  static propTypes = {
    checkChange: PropTypes.func,
    countChange: PropTypes.func,
    item: PropTypes.object,
    isEdit: PropTypes.bool,
    priceVisible: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { item, isEdit, priceVisible } = this.props;
    return (
      <div>
          <Promotion tip="组合" title={item.title} href={`/_react_/goods/pdetail/zh/${item.id}`} />
          <CombineItem
            id={item.id}
            cartId={item.cartId}
            type={item.type}
            isEdit={isEdit}
            priceVisible={priceVisible}
            delChecked={item.delChecked}
            checked={item.checked}
            checkChange={this.props.checkChange}
            countChange={this.props.countChange}
            price={item.price}
            count={item.count}
            items={item.products}
            unit={item.unit}
            noCount={item.noCount}
          />
      </div>
    );
  }
}
