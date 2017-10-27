/**
 * 废弃 2017-09-04
 * 使用 countInput
 */
import React, {PropTypes} from 'react';
import styled from 'styled-components';
import sub from './sub.png';
import sub1 from './sub1.png';
import plus from './plus.png';

const Container = styled.div`
  padding: 8px 12px;
  position: relative;
`;

const Sub = styled.a`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url(${props => props.active ? sub1 : sub}) no-repeat center center;
  background-size: 12px 1px;
  border: 1px solid #e0e0e0;
  border-radius: 4px 0 0 4px;
  vertical-align: middle;
`;

const Plus = styled.a`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url(${plus}) no-repeat center center;
  background-size: 12px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 0 4px 4px 0;
  vertical-align: middle;
`;

const Input = styled.input`
  width: 90px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: none;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 0;
  margin: 0;
  font-size: 13px;
  vertical-align: middle;
`;

const Unit = styled.span`
  font-size: 13px;
  margin-left: 12px;
`;

export default class CountItem extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    active: PropTypes.bool,
    showPrompt: PropTypes.func,
    countChange: PropTypes.func,
    unit: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  countChange = (subOrPlus) => {
    let count = parseInt(this.numberInput.value, 10);
    if (subOrPlus === 'sub') {
      if (count === 1) return;
      this.props.countChange(--count);
    } else {
      this.props.countChange(++count);
    }
  }

  render() {
    const { active, count, unit } = this.props;
    return (
      <Container>
        <Sub active={active} onClick={() => this.countChange('sub')}/>
        <Input type="number" readOnly innerRef={(input) => {this.numberInput = input;}} value={count} onClick={this.props.showPrompt} />
        <Plus onClick={() => this.countChange('plus')}/>
        <Unit>{unit || '箱'}</Unit>
      </Container>
    );
  }
}
