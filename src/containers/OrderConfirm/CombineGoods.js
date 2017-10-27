/**
 * 组合促销
 */
import React, {PropTypes} from 'react';
import Promotion from 'containers/Cart/Promotion';
import CombineItem from 'containers/Cart/CombineItem';

export default class CombineGoods extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    priceVisible: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { item, priceVisible } = this.props;
    return (
      <div>
          <Promotion tip="组合" title={item.title} />
          <CombineItem
            id={item.id}
            cartId={item.cartId}
            type={item.type}
            priceVisible={priceVisible}
            price={item.price}
            count={item.count}
            items={item.products}
            numberInfo={item.numberInfo}
            noCount
          />
      </div>
    );
  }
}
