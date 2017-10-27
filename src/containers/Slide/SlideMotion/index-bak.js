import React, {PropTypes} from 'react';
import {Motion, spring} from 'react-motion';
import styled, { keyframes } from 'styled-components';

const Transform = styled.div`
  position: fixed;
  width: 80%;
  height: 100%;
  background-color: #FFF;
  left: 0;
  top: 0;
  z-index: 1002;
  transform: translate3d(${props => props.x ? props.x : 0}px, 0, 0);
`;

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }

  1% {
    opacity: 0;
  }

  100% {
    opacity: 0.7;
  }
`;

const FadeOut = keyframes`
  0% {
    opacity: 0.7;
  }

  1% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
  }
`;

const Masking = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.7;
  display: ${props => props.show ? 'block' : 'none'};
  animation: ${props => props.show ? FadeIn : FadeOut} 1.2s ease-out;
  z-index: 1001;
`;

export default class SlideMotion extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    show: PropTypes.bool,
    xDis: PropTypes.number,
    hideSlide: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children, xDis, show, hideSlide } = this.props;
    return (
        <div>
          <Motion style={{x: spring(xDis)}}>
          {({x}) =>
            <Transform x={x} innerRef={tran => this.tranRef = tran}>
              {children}
            </Transform>
          }
          </Motion>
          <Masking show={show} onClick={hideSlide} innerRef={masking => this.maskRef = masking}/>
        </div>
    );
  }
}
