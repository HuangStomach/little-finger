import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { HashRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import {Layout, Breadcrumb } from 'antd';
import List from "./view/Server/List";
import ServerList from "./view/Server/ServerList";
import AppStyle from './App.css';
import SideMenu from "./components/SideMenu";

const {Header, Footer, Sider, Content} = Layout;

@observer
class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh'}}>
          <Sider className={AppStyle.sider}>
            <h2 className={AppStyle.logo}>Nagios</h2>
            <SideMenu/>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header className={AppStyle.header}/>
            <Content style={{padding: '0 16px', marginTop: 64}}>
              <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>

              <div className={AppStyle.content}>
                <Switch>
                  <Route exact path="/list" component={List}/>
                  <Route path="/serverList" component={ServerList}/>
                </Switch>
              </div>
            </Content>

            <Footer style={{textAlign: 'center'}}>
               Nagios ©2018 Created by Genee
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
