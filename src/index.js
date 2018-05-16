import 'bulma/css/bulma.css?raw'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as store from 'store';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider {...store}>
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
