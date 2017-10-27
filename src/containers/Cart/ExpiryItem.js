import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import GoodItem from '../Goods/Main/GoodItem';
import Mark from './Mark';

const Root = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid #f0f1f2;
`;

const Info = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: 12px;
  color: #999999;
`;

export default class ExpiryItem extends Component {
  static propTypes = {
    picUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    info: PropTypes.string,
    id: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {id, picUrl, title, subtitle, info} = this.props;
    return (
      <Root>
        <Mark/>
        <GoodItem id={id} img={picUrl} title={title} subtitle={subtitle} >
          <Info>
            {info}
          </Info>
        </GoodItem>
      </Root>
    );
  }
}
