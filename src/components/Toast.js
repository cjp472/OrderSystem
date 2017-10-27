import React, {PropTypes} from 'react';
import styled from 'styled-components';
import right from './right.png';

const Container = styled.div`
  position: absolute;
  width: 120px;
  height: 90px;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -50px;
  color: #FFF;
  padding: 15px 10px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  z-index: 1005;
`;

const Masking = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
`;

const Con = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1006;
  padding: 15px 10px;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
`;

export default class Toast extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { show, title } = this.props;
    return (
      show &&
      <Container>
        <Con>
          <Icon src={right} />
          <Title>{title}</Title>
        </Con>
        <Masking />
      </Container>
    );
  }
}
