import React, {PropTypes} from 'react';
import styled from 'styled-components';
import CountInput from 'containers/CountInput';
// import CountItem from './CountItem';

const Label = styled.div`
  box-sizing: border-box;
  width: 100%;
  font-size: 15px;
  color: #000;
  padding: 15px 12px 8px;
`;

const CountItem = styled.div`
  padding: 8px 12px;
`;

export default class Count extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    unit: PropTypes.string,
    active: PropTypes.bool,
    showPrompt: PropTypes.func,
    subCount: PropTypes.func,
    plusCount: PropTypes.func,
    countChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { count, unit } = this.props;
    return (
      <div>
        <Label>数量</Label>
        <CountItem>
          <CountInput
            count={count}
            unit={unit}
            countChange={this.props.countChange}
          />
        </CountItem>
      </div>
    );
  }
}
