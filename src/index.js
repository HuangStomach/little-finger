import 'antd/dist/antd.css?raw';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import * as store from 'store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider {...store}>
  <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();
