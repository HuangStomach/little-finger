import React from "react";
import {Layout, Breadcrumb} from 'antd';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AppStyle from '../App.css';
import Menus from "./Menus";
import {ROUTES} from "../config/routes.config";
import _ from "lodash";

const routes = _.clone(ROUTES);

class Layouts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: ""
    }
  }

  updateActive = (key) => {
    let index = _.findIndex(routes, route => route.key === key);
    this.setState({current: routes[index]['text']});
  };

  render() {
    const {Sider, Header, Content, Footer} = Layout;
    return (
      <Router>
        <Layout style={{ minHeight: '100vh'}}>
          <Sider className={AppStyle.sider}>
            <h2 className={AppStyle.logo}>Nagios</h2>
            <Menus updateActive={this.updateActive}/>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header className={AppStyle.header}/>
            <Content style={{padding: '0 16px', marginTop: 64}}>
              <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>{this.state.current}</Breadcrumb.Item>
              </Breadcrumb>
              <div className={AppStyle.content}>
                {
                  routes.map((route) =>
                    <Route exact key={route.key} path={route.link} component={route.component}/>)
                }
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Nagios ©2018 Created by Genee.</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default Layouts;