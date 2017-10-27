import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Swipe from '../Swipe';
import noImg from './noBigImg.png';
import Tag from 'components/Tag';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const Hr = styled.hr`
  background: #E5E5E5;
  height: 1px;
  border: none;
`;

const Info = styled.div`
  padding-top: 2px;
  padding-bottom: 8px;
  padding-left: 12px;
`;

const Title = styled.div`
  padding-right: 70px;
  font-size: 17px;
  line-height: 1.4;
`;

const SubTitle = styled.div`
  font-size: 12px;
  color: #999;
`;

const Root = styled.div`
  position: relative;
  background: #fff;
  margin-bottom: 10px;
  box-shadow: 0 1px 0 0 #E5E5E5;
`;

const TagCon = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

@connect(null, {
  pushState: push
})
export default class Head extends Component {
  static propTypes = {
    imgs: PropTypes.array,
    title: PropTypes.node,
    subtitle: PropTypes.string,
    tag: PropTypes.string,
    id: PropTypes.string,
    pushState: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {imgs, title, subtitle, tag, id} = this.props;
    return (
      <Root>
        { imgs.length ? <Swipe imgs={imgs}/> : <Img src={noImg} /> }
        <Hr/>
        <Info>
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
          {tag && <TagCon onClick={() => this.props.pushState(`/_react_/goods/promotion/${id}`)}><Tag tag={tag}/></TagCon>}
        </Info>
      </Root>
    );
  }
}
