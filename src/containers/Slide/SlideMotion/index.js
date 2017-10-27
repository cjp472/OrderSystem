import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Transform = styled.div`
  position: fixed;
  width: 80%;
  height: 100%;
  background-color: #FFF;
  right: 0;
  top: 0;
  z-index: 1002;
  display: ${props => props.show ? 'block' : 'none'};
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
    const { children, show, hideSlide } = this.props;
    return (
        <div>
          <Transform show={show}>
            {children}
          </Transform>
          <Masking show={show} onClick={hideSlide} innerRef={masking => this.maskRef = masking}/>
        </div>
    );
  }
}
