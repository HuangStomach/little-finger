import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { observer } from 'mobx-react';

import Links from '@/Links';
import ServerList from '@/ServerList';
const User = Loadable({loader: () => import(/* webpackChunkName: "user" */  'view/User'), loading: () => null});
const Repo = Loadable({loader: () => import(/* webpackChunkName: "repo" */  'view/Repo'), loading: () => null});
const Repos = Loadable({loader: () => import(/* webpackChunkName: "repos" */  'view/Repos'), loading: () => null});

@observer
class App extends Component {
  render() {
    return (
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              服务器列表
            </h1>         
            <ServerList />
          </div>
        </div>
      </section>
    );
  }
};

export default App;
