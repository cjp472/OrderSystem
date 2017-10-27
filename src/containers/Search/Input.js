import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import sicon from './search.png';
import deletePng from './delete.png';

const DeleteIcon = styled.img`
  height: 16px;
  position: absolute;
  right: 7px;
  top: 6px;
`;

const Root = styled.form`
  position: relative;
  display: flex;
  flex: 1;
  background: #EDEEF0;
  border-radius: 5px;
  height: 28px;
  box-sizing: border-box;
  overflow: hidden;
  margin-left: 20px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 6px;
  margin-right: 8px;
  margin-left: 8px;
`;

const InputSearch = styled.input`
  flex: 1;
  font-size: 14px;
  vertical-align: middle;
  line-height: 18px;
  background-color: #f0f1f2;
  border: none;
  outline: none;
  appearance: none;
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration{
    display: none;
  }
`;

export default class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    hasDelete: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {onChange, onSearch, ...others} = this.props;
    return (
      <Root onSubmit={event => onSearch(event)}>
        <Icon src={sicon} alt=""/>
        <InputSearch {...others} onChange={event => onChange(event.target.value)}/>
        {this.props.hasDelete && <DeleteIcon onClick={() => onChange('')} src={deletePng}/>}
      </Root>
    );
  }
}
