import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Attributes from '../Order/Attributes';

const Root = styled.div`
  margin-top: 10px;
`;

export default class Price extends Component {
  static propTypes = {
    items: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { items } = this.props;
    return (
      <Root>
        <Attributes right items={items} />
      </Root>
    );
  }
}
