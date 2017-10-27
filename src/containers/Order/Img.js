import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: relative;
  border: 1px solid #E5E5E5;
  width: 85px;
  height: 85px;
  background: #FFFFFF;
`;

const Img = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  max-width: 85px;
  max-height: 85px;
`;

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {src} = this.props;
    return (
      <Root>
        <Img src={src}/>
      </Root>
    );
  }
}
