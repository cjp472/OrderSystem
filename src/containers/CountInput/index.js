import React, {PropTypes} from 'react';
import styled from 'styled-components';
// import Portal from 'react-portal';
import sub from './sub.png';
import sub1 from './sub1.png';
import plus from './plus.png';
// import Prompt from './Prompt';
import PromptDialog from './PromptDialog';

const Container = styled.div`
  position: relative;
`;

const Sub = styled.a`
  display: inline-block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: url(${props => props.active ? sub1 : sub}) no-repeat center center #FFF;
  background-size: 12px 1px;
  border: 1px solid #e0e0e0;
  border-radius: 4px 0 0 4px;
  vertical-align: middle;
`;

const Plus = styled.a`
  display: inline-block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: url(${plus}) no-repeat center center #FFF;
  background-size: 12px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 0 4px 4px 0;
  vertical-align: middle;
`;

const Input = styled.input.attrs({
  width: props => props.width || '120',
  height: props => props.height || '30'
})`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  text-align: center;
  line-height: ${props => props.height}px;
  border: none;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 0;
  margin: 0;
  font-size: 13px;
  vertical-align: middle;
  border-radius: 0;
`;

const Unit = styled.span`
  font-size: 13px;
  margin-left: 12px;
`;

export default class CountInput extends React.Component {
  static propTypes = {
    countChange: PropTypes.func,
    count: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    unit: PropTypes.string,
    size: PropTypes.string,
    isFloat: PropTypes.bool,
  };

  static defaultProps = {
    size: 'big',
    isFloat: false,
    min: 1,
    max: 99999
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.count || props.min,
      active: props.count > props.min ? true : false || false,
      show: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.count !== this.props.count) {
      this.setState({
        value: nextProps.count,
        active: nextProps.count > nextProps.min ? true : false,
      });
    }
  }

  getSize = (size) => {
    if (size === 'small') {
      return {width: 37, height: 24};
    } else if (size === 'middle') {
      return { width: 60, height: 30};
    }
    return {width: 90, height: 30};
  }

  countChange = (subOrPlus) => {
    const { min, max } = this.props;
    let { value } = this.state;
    if (subOrPlus === 'sub') {
      value--;
    } else {
      value++;
    }
    let curValue = value;
    let active = true;
    if (value <= min) { // 如果value小于最小值,则设置为最小值，同时active为false
      curValue = min;
      active = false;
    }
    if (value > max) {
      curValue = max;
    }
    this.setState({value: curValue, active: active});
    this.props.countChange(curValue);
  }

  showPrompt = () => {
    this.myPortal.openPortal();
  }

  hidePrompt = () => {
    this.setState({show: false});
  }

  confirmCount = (value) => {
    const { min, max } = this.props;
    let curValue = value;
    let active = true;
    if (value <= min) { // 如果value小于最小值,则设置为最小值，同时active为false
      curValue = min;
      active = false;
    }
    if (value > max) {
      curValue = max;
      active = true;
    }
    this.setState({value: curValue, show: false, active: active});
    this.props.countChange(curValue);
  }

  render() {
    const { unit, size, isFloat } = this.props;
    const { value, active, show } = this.state;
    const { width, height } = this.getSize(size);
    return (
      <Container>
        <Sub width={height} height={height} active={active} onClick={() => this.countChange('sub')}/>
        <Input type="number" readOnly width={width} height={height} value={value} onClick={() => this.showPrompt()} />
        <Plus width={height} height={height} onClick={() => this.countChange('plus')}/>
        <Unit>{unit || ''}</Unit>
        <PromptDialog portRef={el => this.myPortal = el} show={show} value={value} isFloat={isFloat} hidePrompt={this.hidePrompt} confirmCount={this.confirmCount}/>
      </Container>
    );
  }
}
