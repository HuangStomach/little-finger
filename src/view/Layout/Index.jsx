import React from "react";
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { Layout, Breadcrumb } from 'antd';
import { BrowserRouter, Route } from 'react-router-dom'
import Style from './Index.css';
import Sidebar from 'view/Layout/Sidebar';
import Routes from 'store/modules/routes';

const { Sider, Header, Content } = Layout;

@observer
class Layouts extends React.Component {
  @computed get title() {
    // 利用current的key来去寻找对应route的text 默认为空
    // 各Route对应组件会在mount后设置current
    if (Routes.current == null) return '';
    return Reflect.get(Routes.children, Routes.current).text;
  }

  render() {
    const children = Routes.children;
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
                <Breadcrumb.Item>{this.title}</Breadcrumb.Item>
              </Breadcrumb>
              <div className={Style.content}>
                {Object.keys(children).map(key => 
                  <Route exact key={key} path={children[key].path} component={children[key].component} />
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}
export default Layouts;