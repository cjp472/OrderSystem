/**
 * 买赠促销
 */
import React, {PropTypes} from 'react';
import Promotion from 'containers/Cart/Promotion';
import Item from './Item';
import Gift from 'containers/Cart/Gift';

export default class GiftGoods extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    priceVisible: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { item, priceVisible } = this.props;
    const Goods = item.products && item.products.map((product, index) => {
      return (
        <Item key={index} priceVisible={priceVisible} type={item.type} {...product} />
      );
    });
    const Gifts = item.gifts && item.gifts.map((gift, index) => {
      return (
        <Gift key={index} title={gift.title} tip={gift.tip} />
      );
    });

    return (
      <div>
        <Promotion tip="满赠" title={item.title} />
        {Goods}
        {Gifts}
      </div>
    );
  }
}
