import React, { Component, PropTypes } from 'react';
import MenuItem from './MenuItem';
import SubMenuItem from './SubMenuItem';
import styled from 'styled-components';

const Container = styled.div`
  width: 95px;
  overflow-y: auto;
  border-top: 1px solid #E5E5E5;
  border-right: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
  background-color: #FFF;
`;

export default class Menu extends Component {
  static propTypes = {
    types: PropTypes.array,
    selectSubGoods: PropTypes.func,
    selectGoods: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { types } = this.props; // 商品类型
    const Menus = types && types.map(type => {
      if (type.children) {
        const SubMenuItems = type.children.map(value => {
          return (
            <SubMenuItem
              key={value.id}
              selected={value.active}
              label={value.name}
              id={type.id}
              subId={value.id}
              selectSubGoods={this.props.selectSubGoods}
            />
          );
        });
        return (
          <MenuItem
            key={type.id}
            id={type.id}
            label={type.name}
            open={type.open}
            close={!type.open}
            hasChildren
            selectGoods={this.props.selectGoods}
            selected={type.active} >
              { type.open && SubMenuItems }
          </MenuItem>
        );
      }
      return (
        <MenuItem
          key={type.id}
          id={type.id}
          label={type.name}
          open={type.active && type.hasChildren}
          close={!type.active && type.hasChildren}
          hasChildren={false}
          selectGoods={this.props.selectGoods}
          selected={type.active}
        />
      );
    });
    return (
      <Container>
        {Menus}
      </Container>
    );
  }
}
