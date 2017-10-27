import React, {PropTypes} from 'react';
import styled from 'styled-components';
import StarIcon from './star.png';
import WStarIcon from './wStar.png';

const Star = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 18px;
`;

const Root = styled.div`
  margin: 0 12px;
  height: 45px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
`;

const Label = styled.label`
  margin-right: 6px;
`;

export default class Score extends React.Component {
  static propTypes = {
    star: PropTypes.number,
    setGrade: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { star } = this.props;
    const Stars = [1, 2, 3, 4, 5];
    return (
      <Root>
        <Label>服务评分：</Label>
        {Stars.map((num) => (
            <Star onClick={() => this.props.setGrade(num)} key={num} src={num <= star ? StarIcon : WStarIcon}/>
        ))}
      </Root>
    );
  }
}
