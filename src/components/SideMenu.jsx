import React , { Component } from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';


class SideMenu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      menuList:[
        {key:1, type: 'home',  to:'/list', linkName:'监控台' },
        {key:2, type: 'table', to:'/serverList', linkName:'服务器列表' },
      ],
    };
  }

  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {
          this.state.menuList.map((list) => (
            <Menu.Item key={list.key}>
              <Icon type={list.type}/>
              <NavLink to={list.to} style={{display:'inline'}}>
                <span>{list.linkName}</span>
              </NavLink>
            </Menu.Item>
            )
          )
        }
      </Menu>
    );
  }
}
export default SideMenu;