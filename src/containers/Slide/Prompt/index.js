import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1004;
`;

const Dialog = styled.div`
  width: 300px;
  height: 176px;
  background-color: #FFF;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -88px;
  border-radius: 5px;
  z-index: 1005;
  overflow: hidden;
`;

const Masking = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.7;
`;

const Title = styled.div`
  padding: 20px 0;
  font-size: 16px;
`;

const Input = styled.input`
  width: 246px;
  height: 33px;
  line-height: 35px;
  border: 1px solid #e0e1e2;
  border-radius: 2px;
  padding-left: 8px;
  font-size: 16px;
  &:hover,
  &:focus,
  &:active {
    outline: none;
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const Button = styled.button`
  width: 50%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  padding: 0;
  border-width: 0;
  border-style: none;
  border-top: 1px solid #e0e1e2;
  font-size: 16px;
  &:focus,
  &:active,
  &:hover {
    outline: none;
  }
`;

const CancelBtn = Button.extend`
  background-color: #FFF;
`;

const ConfirmBtn = Button.extend`
  background-color: #EB464A;
  color: #FFF;
`;

export default class Prompt extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    count: PropTypes.number,
    hidePrompt: PropTypes.func,
    confirmCount: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {value: this.props.count};
  }

  componentDidMount = () => {
    this.countInput.focus();
    this.countInput.select();
  }

  inputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    this.setState({value});
  }

  confirmCount = () => {
    let value = this.state.value;
    value = parseInt(value, 10) || '';
    if (value) {
      this.props.confirmCount(value);
    }
  }

  render() {
    return (
      <Container>
        <Dialog>
            <Title>{'请输入订货数量'}</Title>
            <Input type="number" value={this.state.value} innerRef={(input) => { this.countInput = input; }} onChange={this.inputChange} />
            <BtnContainer>
              <CancelBtn onClick={this.props.hidePrompt}>{'取消'}</CancelBtn>
              <ConfirmBtn onClick={this.confirmCount}>{'确认'}</ConfirmBtn>
            </BtnContainer>
        </Dialog>
        <Masking />
      </Container>
    );
  }
}
