import React, {PropTypes} from 'react';
import ExpiryItem from './ExpiryItem';
import CombineExpiryItem from './CombineExpiryItem';
import Title from './Title';

export default class ExpiryGoods extends React.Component {
  static propTypes = {
    items: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;
    const ExpiryItems = items.map((item, index) => {
      if (item.type === '2') {
        return <CombineExpiryItem key={index} items={item.products} />;
      } else if (item.type === '1') {
        return <ExpiryItem key={index} {...item.product} />;
      }
    });
    return (
      <div>
        { ExpiryItems.length ? <Title name="失效商品"/> : null }
        { ExpiryItems }
      </div>
    );
  }
}
