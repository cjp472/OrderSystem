import React, {PropTypes} from 'react';
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

const LoadingCon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -18px;
  margin-left: -50px;
  padding: 4px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
`;

const Loading = styled.img`
  width: 24px;
  height: auto;
  vertical-align: middle;
`;

const Text = styled.span`
  margin-left: 5px;
  font-size: 12px;
  vertical-align: middle;
  color: #666;
`;

/**
 * 带文字的Loading
 */
export default class Load2 extends React.Component {
  static propTypes = {
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {text} = this.props;
    return (
      <Container>
        <LoadingCon>
          <Loading src={load} />
          <Text>{text}</Text>
        </LoadingCon>
      </Container>
    );
  }
}
