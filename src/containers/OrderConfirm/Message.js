import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  margin-top: ${props => props.marginTop}px;
  background: #fff;
  padding: 12px;
  font-size: 15px;
  color: #999999;
`;

const Input = styled.textarea`
  width: 100%;
  height: 40px;
  border: none;
  padding: 8px 2px;
  font-size: 15px;
  outline: none;
  resize: none;
  ::-webkit-input-placeholder {
    color: #CCCCCC;
  }
`;

// 留言
export default class Message extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    marginTop: PropTypes.number,
  };

  static defaultProps = {
    marginTop: 10
  };

  constructor(props, context) {
    super(props, context);
  }

  onChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    const { value, label, placeholder, marginTop } = this.props;
    return (
      <Root marginTop={marginTop} >
        {label}
        <Input placeholder={placeholder} onChange={this.onChange} value={value} />
      </Root>
    );
  }
}
