import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #f0f1f2;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Button = styled.div`
  height: 50px;
  line-height: 50px;
  color: #FFF;
  background-color: #EB464A;
  text-align: center;
`;

const Cart = Button.extend`
  width: 117px;
  position: absolute;
  right: 0;
`;

const Confirm = Button.extend`
  width: 100%;
`;

export default class Footer extends React.Component {
  static propTypes = {
    pageFrom: PropTypes.string,
    addInCart: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { pageFrom } = this.props; // list:列表页  detail:详情页
    return (
      <Container>
        {pageFrom === 'list' ? <Cart onClick={this.props.addInCart}>加入购物车</Cart> :
          <Confirm onClick={this.props.addInCart}>确定</Confirm>}
      </Container>
    );
  }
}
