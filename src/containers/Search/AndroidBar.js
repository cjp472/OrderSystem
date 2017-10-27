import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Input from './Input';
import back from './Back.png';

const Root = styled.div`
  display: flex;
  height: 44px;
  box-shadow: 0 1px 0 0 #E5E5E5;
  background-color: #fff;
  padding: 8px 12px;
  box-sizing: border-box;
`;

const Search = styled.div`
  font-size: 15px;
  color: #666666;
  line-height: 30px;
  padding-left: 10px;
`;

const BackIcon = styled.span`
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid #333;
  border-width: 1px 0 0 1px;
  transform: rotate(315deg);
  vertical-align: middle;
  top: 15px;
  left: 14px;
`;


export default class AndroidBar extends Component {
  static propTypes = {
    searchEvent: PropTypes.func,
    placeholder: PropTypes.string,
    onClose: PropTypes.func,
    defaultValue: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.defaultValue || '',
      hasDelete: false
    };
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  onChange = (value) => {
    if (value.length === 0) {
      this.setState({hasDelete: false});
    } else {
      this.setState({hasDelete: true});
    }
    this.searchInput.focus();
    this.setState({value});
  }

  onSearch = (event) => {
    event.preventDefault();
    this.props.searchEvent(this.state.value);
    this.searchInput.blur();
  }

  close = () => {
    if (this.props.onClose) {
      this.props.onClose();
    } else {
      history.back();
    }
  }

  render() {
    const { placeholder, searchEvent } = this.props;
    return (
      <Root>
        <BackIcon onClick={this.close} src={back}/>
        <Input type="search" innerRef={input => this.searchInput = input} hasDelete={this.state.hasDelete} placeholder={placeholder} onChange={this.onChange} onSearch={this.onSearch} value={this.state.value} />
        <Search onClick={() => searchEvent(this.state.value)}>搜索</Search>
      </Root>
    );
  }
}
