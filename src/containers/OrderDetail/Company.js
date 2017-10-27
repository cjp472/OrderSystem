import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import comp from 'components/icons/company.png';

const Root = styled.div`
  padding: 12px;
  background: #fff;
  box-shadow: 0px 1px 0 0 #E5E5E5, 0px -1px 0 0 #E5E5E5;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  margin-bottom: -1px;
`;

export default class Company extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { name } = this.props;
    return (
      <Root>
        <Icon src={comp}/>
        { name }
      </Root>
    );
  }
}
