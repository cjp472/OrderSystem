import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import openpng from './open.png';
import closepng from './close.png';

const Container = styled.div`
  padding-left: ${({selected}) => selected ? '13px' : '15px' };
  padding-right: 15px;
  padding-top: ${({twoline}) => twoline ? '7px' : '16px' };
  overflow: hidden;
  box-sizing: border-box;
  color: #666666;
  font-size: 14px;
  margin-bottom: -1px;
  border-bottom: 1px solid #E5E5E5;
  position: relative;
  min-height: 50px;
  line-height: 18px;
  border-left: ${({selected}) => selected ? '2px solid #EB464A' : 'none' }
`;

const Icon = styled.img`
  position: absolute;
  right: 8px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 10px;
  height: 7px;
`;

export default class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    open: PropTypes.bool,
    close: PropTypes.bool,
    label: PropTypes.string,
    selected: PropTypes.bool,
    hasChildren: PropTypes.bool,
    selectGoods: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
  }

  selectGoods = () => {
    const { id, hasChildren, open, selected } = this.props;
    this.props.selectGoods(id, hasChildren, open, selected);
  }

  render() {
    const {children, label = '', selected, open, close} = this.props;
    return (
      <div>
        <Container selected={selected} twoline={label.length > 4} onClick={this.selectGoods}>
          {label.substring(0, 8)}
          {open && <Icon src={openpng}/>}
          {close && <Icon src={closepng}/>}
        </Container>
        {children}
      </div>
    );
  }
}
