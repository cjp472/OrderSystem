import React, { Component, PropTypes } from 'react';
import Img from './Img';
import styled from 'styled-components';
import { getLocalData } from 'utils/localStorage';
import { judgeImgUrl } from 'utils/utils';

const Root = styled.div`
  display: block;
  white-space: nowrap;
  background: #FAFAFA;
  box-shadow: inset 0 -1px 0 0 #E5E5E5, 0 -1px 0 0 #E5E5E5;
  height: 109px;
  box-sizing: border-box;
  padding: 11px;
  overflow-x: auto;
  overflow-y: hidden;
  overflow: scroll;
`;

const ImgContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 12px;
  width: 85px;
`;

export default class ImgScroll extends Component {
  static propTypes = {
    imgs: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { imgs } = this.props;
    const imageUrl = getLocalData('goods', 'imageUrl');
    imgs = imgs.map((img) => {
      return judgeImgUrl(imageUrl, img);
    });
    return (
      <Root>
        { imgs && imgs.map((img, index) => (
          <ImgContainer key={index}><Img src={img}/></ImgContainer>
        ))}
      </Root>
    );
  }
}
