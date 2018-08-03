import React from "react";
import PropTypes from "prop-types";
import {Menu, Icon} from "antd";
import {Link} from 'react-router-dom';
import {ROUTES as routes} from "../../config/routes.config";

class Menus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeKey: ''
    };
  }

  componentDidMount() {
    let pathname = this.context.router.route.location.pathname;
    let index = routes.findIndex(route => route.link === pathname);
    this.setState({activeKey: routes[index]['key']});
    this.props.updateActive(routes[index]['key']);
  }

  handleClick = (e) => {
    this.setState({activeKey: e.key});
    this.props.updateActive(e.key);
  };

  render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[this.state.activeKey]}
        onClick={this.handleClick}
      >
        {
          routes.map((route) =>
            <Menu.Item key={route.key}>
              <Link to={route.link}>
                <Icon type={route.iconType}/>
                <span>{route.text}</span>
              </Link>
            </Menu.Item>
          )
        }
      </Menu>
    );
  }
}

Menus.contextTypes = {
  router: PropTypes.object
};

export default Menus;