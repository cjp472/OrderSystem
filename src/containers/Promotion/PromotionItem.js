import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Elem = styled.div`
  padding: 12px;
  border-bottom: 1px solid #f0f1f2;
  margin-top: -1px;
  position: relative;
  background-color: #FFF;
`;

const Title = styled.p`
  font-size: 17px;
  color: #000;
  margin: 0;
  padding: 0;
`;

const Label = styled.span`
  font-size: 13px;
  color: #999;
`;

const Text = styled.span`
  font-size: 13px;
  color: #666;
`;

export default class PromotionItem extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    labels: PropTypes.array,
    children: PropTypes.node,
    pushState: PropTypes.func,
    goDetail: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  goDetail = () => {
    const { id, type } = this.props;
    if (this.props.goDetail) {
      this.props.goDetail(`/_react_/goods/pdetail/${type}/${id}`);
    }
  }

  render() {
    const { title, labels, children } = this.props;
    return (
      <Elem onClick={this.goDetail}>
        <Title>{title}</Title>
        {labels && labels.map((item, index) => {
          return item.text && <div key={index}><Label>{item.label}</Label><Text>{item.text}</Text></div>;
        })}
        {children}
      </Elem>
    );
  }
}
