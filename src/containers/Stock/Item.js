import React, { Component, PropTypes } from 'react';
import GoodItem from 'containers/Goods/Main/GoodItem';
import Attributes from '../Order/Attributes';
import CountInput from 'containers/CountInput';
// import styled from 'styled-components';

const styles = {
  container: {
    marginTop: -10,
    background: '#fff',
    position: 'relative',
    boxShadow: '0px 1px 0 0 #E5E5E5'
  }
};

export default class Item extends Component {
  static propTypes = {
    id: PropTypes.string,
    isSign: PropTypes.bool,
    item: PropTypes.object,
    countChange: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  countChange = (value) => {
    const { item, id } = this.props;
    this.props.countChange(value, item.id, id);
  }

  render() {
    const {item, isSign} = this.props;
    return (
      <div>
        <GoodItem
          img={item.picUrl}
          title={item.title}
          subtitle={item.subtitle}
          />
        <Attributes
          style={styles.container}
          right
          items={[{
            name: '发货数量',
            value: `${item.sentNum} ${item.unitName}`
          }, {
            name: '实收数量',
            value: isSign ? `${item.signNum} ${item.unitName}` : <CountInput isFloat size={'middle'} min={0} max={item.sentNum} count={item.signNum} unit={item.unitName} countChange={this.countChange}/>
          }]}
        />
      </div>
    );
  }
}
