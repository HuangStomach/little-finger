import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { HashRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import List from "./view/Server/List";
import ServerList from "./view/Server/ServerList";
import AppStyle from './App.css';

const {Header, Footer, Sider, Content} = Layout;

@observer
class App extends Component {
  render() {
    let headerStyle = {background: '#fff', padding: 0,position: 'fixed', zIndex: 1, width: '100%',boxShadow:'0 1px 4px rgba(0,21,41,.08)'};
    let sideStyle = {overflow: 'auto', height: '100vh', position: 'fixed', left: 0};
    let logoStyle = {color:'white',height:'64px',lineHeight:'64px', textAlign:'center',transition: 'all .3s', background: '#002140',overflow: 'hidden'};
    let contentStyle = {padding: 24, background: '#fff', minHeight: '75vh',overflow:'auto'};
    let activeStyle = {color:'white'};
    return (
      <Router>
        <Layout style={{minHeight: '100vh'}}>
          <Sider style={sideStyle}>
            <h2 className={AppStyle.logo}>Nagios</h2>
            <Menu theme="dark" defaultSelectedKeys={['1']}  mode="inline">
              <Menu.Item key="1">
                <Icon type="home"/>
                <span>
                  <NavLink exact activeStyle={activeStyle} to="/list">监控</NavLink>
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="table"/>
                <span>
                  <NavLink  activeStyle={activeStyle} to="/serverList">服务器列表</NavLink>
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={headerStyle}/>
            <Content style={{padding: '0 16px', marginTop: 64}}>
              <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>

              <div style={contentStyle}>
                <Switch>
                  <Route exact path="/" component={List}/>
                  <Route path="/list" component={List}/>
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
