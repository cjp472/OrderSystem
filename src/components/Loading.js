import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #666;
`;

/**
 * 分页Loading
 */
export default class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container>{this.props.text}</Container>
    );
  }
}

Loading.defaultProps = {
  text: '加载中...'
};
