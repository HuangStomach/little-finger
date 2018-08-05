import React from "react";
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { Menu, Icon } from "antd";
import { Link, withRouter } from 'react-router-dom';
import Routes from 'store/modules/routes';

@observer
class Sidebar extends React.Component {
  @computed get current() {
    return Routes.current;
  }

  render() {
    const children = Routes.children;
    return (
      <Menu theme="dark" mode="inline" selectedKeys={[this.current]}>
        {Object.keys(children).map(key => 
          <Menu.Item key={key}>
            <Link to={children[key].path}>
              <Icon type={children[key].icon}/>
              <span>{children[key].text}</span>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

export default withRouter(Sidebar);