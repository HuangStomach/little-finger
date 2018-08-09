import { observable, action } from 'mobx';
import Loadable from 'react-loadable';

const List = Loadable({loader: () => import('view/List'), loading: () => null});
const Dashboard = Loadable({loader: () => import('view/Dashboard'), loading: () => null});

class Routes {
  @observable current = null;
  children = {
    'dashboard': {
      path: '/', 
      icon: 'dashboard', 
      text: '监控台', 
      component: Dashboard
    }, 
    'list': {
      path: '/list',
      icon: 'table',
      text: '服务器',
      component: List
    }
  };

  @action
  active(key) {
    this.current = key;
  }
}

export default new Routes();