import React, {PropTypes} from 'react';
import GoodItem from 'containers/Goods/Main/GoodItem';
import SlideMotion from './SlideMotion';
import Unit from './Unit';
import Count from './Count';
import Footer from './Footer';
import Prompt from './Prompt';
import styled from 'styled-components';
import Tag from 'components/Tag';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {hideTab} from 'utils/WqJsBridge';

const TagCon = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

@connect(null, {
  pushState: push
})
export default class Slide extends React.Component {
  static propTypes = {
    xDis: PropTypes.number,
    show: PropTypes.bool,
    good: PropTypes.object,
    priceVisible: PropTypes.bool,
    pageFrom: PropTypes.string,
    hideSlide: PropTypes.func,
    countChange: PropTypes.func,
    unitChange: PropTypes.func,
    addInCart: PropTypes.func,
    pushState: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      promptShow: false
    };
  }

  showPrompt = () => {
    this.setState({promptShow: true});
  }

  hidePrompt = () => {
    this.setState({promptShow: false});
  }

  confirmCount = (value) => {
    this.props.countChange(value);
    this.hidePrompt();
  }

  gotoPromotion = (id) => {
    this.props.pushState(`/_react_/goods/promotion/${id}`);
    try {
      hideTab();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { xDis, show, hideSlide, good, pageFrom, priceVisible } = this.props;
    const icon = (good && good.isPromotion) ? <TagCon onClick={() => this.gotoPromotion(good.id)}><Tag tag="促销" /></TagCon> : null;
    const { promptShow } = this.state;
    return (
      <div>
        <SlideMotion xDis={xDis} show={show} hideSlide={hideSlide} >
          {good && <div>
                    <GoodItem
                      id={good.id}
                      img={good.picUrl}
                      title={good.title}
                      subtitle={good.subtitle}
                      price={priceVisible ? good.price : null}
                      left={0}
                    >
                      {icon}
                    </GoodItem>
                    <Unit
                      units={good.units}
                      unitChange={this.props.unitChange} />
                    <Count
                      active={good.count > 1 ? true : false}
                      count={good.count}
                      unit={good.unit}
                      showPrompt={this.showPrompt}
                      countChange={this.props.countChange}
                    />
                    <Footer pageFrom={pageFrom} addInCart={this.props.addInCart}/>
                  </div>}
        </SlideMotion>
        { promptShow && <Prompt count={good.count || '1'} hidePrompt={this.hidePrompt} confirmCount={this.confirmCount} /> }
      </div>
    );
  }
}
