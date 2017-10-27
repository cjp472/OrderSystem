import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Header from './Header';

const Detail = styled.div`
  font-size: 14px;
  padding: 12px;
  background-color: #FFF;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  * {
    max-width: 100%!important;
    box-sizing: border-box!important;
    -webkit-box-sizing:border-box!important;
    word-wrap: break-word!important;
  }
`;

export default class PicDetail extends React.Component {
  static propTypes = {
    detail: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { detail } = this.props;
    return (
      <div>
        <Header title="图文详情" />
        <Detail>
          <div dangerouslySetInnerHTML={{__html: detail}} />
        </Detail>
      </div>
    );
  }
}
