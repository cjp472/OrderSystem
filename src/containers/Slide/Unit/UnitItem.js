
import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0 12px;
`;

const Button = styled.a`
  display: inline-block;
  width: 95px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: ${props => props.active ? '1px solid #EB464A' : '1px solid #e0e0e0'};
  color: ${props => props.active ? '#EB464A' : '#1a1a1a'};
  border-radius: 4px;
  margin:5px 12px 0 0;
`;

export default class UnitItem extends React.Component {
  static propTypes = {
    units: PropTypes.array,
    unitChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {units} = this.props;
    const Content = units && units.map((unit) => {
      return (<Button key={unit.id} active={unit.active} onClick={() => this.props.unitChange(unit.id)}>{unit.name}</Button>);
    });
    return (
      <Container>
        {Content}
      </Container>
    );
  }
}
