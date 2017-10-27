import React, {PropTypes} from 'react';
import styled from 'styled-components';
import UnitItem from './UnitItem';

const Label = styled.div`
  box-sizing: border-box;
  width: 100%;
  font-size: 15px;
  color: #000;
  padding: 15px 12px 8px;
`;

export default class Unit extends React.Component {
  static propTypes = {
    units: PropTypes.array,
    unitChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { units } = this.props;
    return (
      <div>
        <Label>单位</Label>
        <UnitItem units={units} unitChange={this.props.unitChange}/>
      </div>
    );
  }
}
