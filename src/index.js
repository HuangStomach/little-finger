import 'antd/dist/antd.css?raw';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as store from 'store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider {...store}>
  <Router >
    <Route path="/" component={App} />
  </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
