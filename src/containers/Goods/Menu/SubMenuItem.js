import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-left: 25px;
  padding-right: 12px;
  padding-top: ${({twoline}) => twoline ? '7px' : '16px' };
  width: 95px;
  height: 50px;
  background-color: #F4F4F4;
  box-sizing: border-box;
  color: ${({selected}) => selected ? '#EB464A' : '#666666' } ;
  font-size: 13px;
  border-top: 1px solid #E5E5E5;
  line-height: 18px;
`;

export default class SubMenuItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    selected: PropTypes.bool,
    id: PropTypes.string,
    subId: PropTypes.string,
    selectSubGoods: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  selectSubGoods = () => {
    const { id, subId, selected } = this.props;
    this.props.selectSubGoods(id, subId, selected);
  }

  render() {
    const {label = '', selected} = this.props;

    return (
      <Container selected={selected} twoline={label.length > 4} onClick={this.selectSubGoods}>
        {label.substring(0, 8)}
      </Container>
    );
  }
}
