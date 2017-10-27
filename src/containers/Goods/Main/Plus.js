import React, {PropTypes} from 'react';
import styled from 'styled-components';
import plus from './plus.png';

const PlusIcon = styled.img`
  position: absolute;
  right: 12px;
  bottom: 11px;
  width: 22px;
  height: 22px;
`;

export default class Plus extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props;
    return (
      <PlusIcon
        src={plus}
        onClick={(event) => this.props.onClick(event, id)}
      />
    );
  }
}
