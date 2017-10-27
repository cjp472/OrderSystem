import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
  text-align: center;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

const Text = styled.div`
  font-size: 14px;
  margin-top: 12px;
  color: #999;
`;


export default class NoData extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    img: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { img, text } = this.props;
    return (
      <Container>
        <Img src={img} />
        <Text>{text}</Text>
      </Container>
    );
  }
}
