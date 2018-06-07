import React, { Component } from 'react';
import { observer } from 'mobx-react';
import List from 'view/Server/List';

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
            <List />
          </div>
        </div>
      </section>
    );
  }
};

export default App;
