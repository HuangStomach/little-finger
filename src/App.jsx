import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { observer } from 'mobx-react';

import Links from '@/Links';
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
              Gini React Template
            </h1>
            <h2 className="subtitle">
              基理react模板
            </h2>
            <Links/>
            <Route exact path="/" component={User}/>
            <Route path="/user" component={User}/>
            <Route path="/repos" component={Repos}/>
            <Route path="/repo/:name" component={Repo}/>
          </div>
        </div>
      </section>
    );
  }
};

export default App;
