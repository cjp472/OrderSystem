import React from 'react';
import styled from 'styled-components';
import load from './icons/loading.gif';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
`;

const Loading = styled.img`
  width: 24px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`;

/**
 * 页面加载Loading
 */
export default class Load extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Loading src={load} />
      </Container>
    );
  }
}
