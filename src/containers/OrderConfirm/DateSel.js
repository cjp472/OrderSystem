import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Input = styled.input`
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export default class DateSel extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value
    });
    this.props.onChange(event.target.value);
  }

  render() {
    const { value } = this.props;
    return (
      <Input type="date" value={value} onChange={(event) => this.onChange(event)} />
    );
  }
}
