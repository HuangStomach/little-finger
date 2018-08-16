import React from "react";
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { Layout, Breadcrumb, Icon } from 'antd';
import { BrowserRouter, Route } from 'react-router-dom'
import Style from './Index.css';
import Sidebar from 'view/Layout/Sidebar';
import Routes from 'store/modules/routes';

const { Sider, Header, Content } = Layout;
const Item = Breadcrumb.Item;

@observer
class Layouts extends React.Component {
  @computed get title() {
    // 利用current的key来去寻找对应route的text 默认为空
    // 各Route对应组件会在mount后设置current
    if (Routes.current == null) return '';
    //console.log(Routes.current);
    let breadArr = [];
    let routeKey = Routes.current.split('/');
    let route = Reflect.get(Routes.children, routeKey[0]);
    breadArr.push(<Item key={routeKey[0]}> {route.text}</Item>);
    routeKey[1] ? breadArr.push(<Item key={routeKey[1]}> {route['routes'][routeKey[1]].text}</Item>) : '';
    
    return breadArr;
  }

  getRoutes() {
    const children = Routes.children;
    let routes = [];
    Object.keys(children).map(key => {
      routes.push(<Route exact key={key} path={children[key].path} component={children[key].component} />)
      if(Object.keys(children[key].routes).length > 0){
        Object.keys(children[key].routes).map(keynode => 
          routes.push(<Route exact key={keynode} path={children[key].routes[keynode].path} component={children[key].routes[keynode].component} />)
        )
      }
    }) 
    return routes;
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Sider className={Style.sider}>
            <h2 className={Style.logo}>Genee Nagios</h2>
            <Sidebar/>
          </Sider>
          <Layout style={{ marginLeft: 200 }} >
            <Header className={Style.header} />
            <Content style={{padding: '0 16px', marginTop: 64}}>
              <Breadcrumb style={{margin: '16px 0'}}>
               {this.title}
              </Breadcrumb>
              <div className={Style.content}>
               {this.getRoutes()}
              </div>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}
export default Layouts;