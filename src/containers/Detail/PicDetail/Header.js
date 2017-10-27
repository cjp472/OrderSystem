import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;

const Hr = styled.hr`
  background: #ccc;
  height: 1px;
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 0;
  padding: 0;
  margin-left: -40%;
  border-style: none;
`;

const Label = styled.span`
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  z-index: 1;
  position: absolute;
  left: 50%;
  margin-left: -50px;
  color: #333;
  background-color: #f0f1f2;
`;

export default class 类名 extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props;
    return (
      <Container>
        <Hr />
        <Label>{title}</Label>
      </Container>
    );
  }
}
