/**
 * 买赠促销
 */
import React, {PropTypes} from 'react';
import Promotion from './Promotion';
import Item from './Item';
import Gift from './Gift';

export default class GiftGoods extends React.Component {
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
    const Goods = item.products && item.products.map((product, index) => {
      return (
        <Item key={index} isEdit={isEdit} priceVisible={priceVisible} type={item.type} {...product} checkChange={this.props.checkChange} countChange={this.props.countChange}/>
      );
    });
    const Gifts = item.gifts && item.gifts.map((gift, index) => {
      return (
        <Gift key={index} title={gift.title} tip={gift.tip} />
      );
    });

    return (
      <div>
        <Promotion tip="满赠" title={item.title} href={`/_react_/goods/pdetail/mz/${item.id}`} />
        {Goods}
        {Gifts}
      </div>
    );
  }
}
