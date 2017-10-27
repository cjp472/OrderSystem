/**
 *  买赠促销 叠加促销赠品
 */
import React, {PropTypes} from 'react';
import Promotion from './Promotion';
import Gift from './Gift';

export default class OverlapGift extends React.Component {
  static propTypes = {
    gift: PropTypes.object,
    noHref: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { gift, noHref } = this.props;
    const Products = gift && gift.products && gift.products.map((product) => {
      return <Gift key={product.id} title={product.title} tip={product.tip} />;
    });
    const href = noHref ? null : `/_react_/goods/pdetail/mz/${gift.id}`;
    return (
      <div>
        <Promotion padding tip="满赠" title={gift && gift.title} href={href}/>
        { Products }
      </div>
    );
  }
}
