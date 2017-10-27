import React, {PropTypes} from 'react';
import Gift from './Gift';

export default class GiftList extends React.Component {
  static propTypes = {
    products: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { products } = this.props;
    return (
      products && products.map((product) => {
        return <Gift title={product.title} tip={product.tip} />;
      })
    );
  }
}
