import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 42px;
  padding: 15px 12px 8px 12px;
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 13px;
  background-color: #FFF;
`;

export default class Header extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <Container>{children}</Container>
    );
  }
}
