import React, { Component, PropTypes } from 'react';
import ReactSwipe from 'react-swipe';
import styled from 'styled-components';
import selectedIcon from './oval.png';
import unselectIcon from './oval2.png';
import { getLocalData } from 'utils/localStorage';
import { judgeImgUrl } from 'utils/utils';

const Container = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 18px;
`;

const Img = styled.img`
  height: 180px;
  width: auto;
`;

const Root = styled.div`
  position: relative;
`;

const Steps = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12px;
  text-align: center;
  height: 7px;
`;

const Point = styled.img`
  width: 6px;
  height: 6px;
  vertical-algin: top;
  margin-left: 4px;
  margin-right: 4px;
`;

export default class Swipe extends Component {
  static propTypes = {
    imgs: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {current: 0};
  }

  render() {
    let {imgs = []} = this.props;
    const imageUrl = getLocalData('goods', 'imageUrl');
    imgs = imgs.map((img) => {
      return judgeImgUrl(imageUrl, img);
    });
    const {current} = this.state;
    return (
      <Root>
        <ReactSwipe swipeOptions={{
          auto: 5000,
          callback: (index) => this.setState({current: index})
        }}>
          {imgs.map((img, index) => (
            <Container key={index}>
              <Img src={img} alt=""/>
            </Container>
          ))}
        </ReactSwipe>
        <Steps>
          {imgs.map((img, index) => (
            index === current ? <Point key={index} src={selectedIcon}/> : <Point key={index} src={unselectIcon}/>
          ))}
        </Steps>
      </Root>
    );
  }
}
