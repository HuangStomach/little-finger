import React from "react";
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { Menu, Icon } from "antd";
import { Link } from 'react-router-dom';
import Routes from 'store/modules/routes';
const SubMenu = Menu.SubMenu;
@observer
class Sidebar extends React.Component {
  @computed get current() {
    return Routes.current;
  }

  render() {
    const children = Routes.children;
    return (
      <Menu theme="dark" mode="inline" selectedKeys={[this.current]}>
        {Object.keys(children).map(subkey => 
          <Menu.Item key={subkey}>
            <Link to={children[subkey].path}>
              <Icon type={children[subkey].icon}/>
              <span>{children[subkey].text}</span>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

export default Sidebar;
