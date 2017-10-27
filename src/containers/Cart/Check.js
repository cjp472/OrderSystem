import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import ck from 'components/icons/checked.png';
import uck from 'components/icons/unchecked.png';

const Root = styled.div`
  font-size: 13px;
  padding-top: 2px;
  margin-right: 18px;
`;

const CkImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 6px;
  vertical-align: -4px;
`;

const Label = styled.label`
  font-size: 13px;
`;

export default class Check extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    checkChange: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {checked, checkChange} = this.props;
    return (
      <Root>
        <CkImg onClick={() => checkChange(!checked)} src={checked ? ck : uck} alt=""/>
        <Label>全选</Label>
      </Root>
    );
  }
}
