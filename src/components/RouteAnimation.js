import React, { Component, PropTypes } from 'react';
import {Motion, spring} from 'react-motion';

export default class RouteAnimation extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      x: 400,
      animate: true,
      opacity: 0
    };
  }

  componentDidMount() {
      this.setState({x: 0}); // eslint-disable-line
  }

  componentWillReceiveProps() {
    if (window._react_page_action === 'PUSH') {
      this.setState({x: 400, animate: false});
      setTimeout(() => {
        this.setState({x: 0, animate: true});
      }, 10);
    } else {
      this.setState({opacity: 1, animate: false});
      setTimeout(() => {
        this.setState({opacity: 0, animate: true});
      }, 10);
    }
  }


  render() {
    const {x: xleft, opacity: xopacity, animate} = this.state;
    // console.log(opacity);
    return (
      <div>
        <Motion style={{x: animate ? spring(xleft) : xleft }}>
          {({x}) => (
            <div x={x} style={{
              height: x ? '100vh' : 'auto',
              transform: x ? `translate3d(${x}px, 0, 0)` : 'none',
            }}>
              {this.props.children}
            </div>
          )}
        </Motion>
        <Motion style={{opacity: animate ? spring(xopacity) : xopacity }}>
          {({opacity}) => (
            <div style={{
              position: 'fixed',
              zIndex: opacity ? `99999` : '-1',
              background: '#fff',
              left: 0,
              top: 0,
              bottom: 0,
              right: 0,
              opacity
            }} opacity={opacity}/>
          )}
        </Motion>
      </div>
    );
  }
}
