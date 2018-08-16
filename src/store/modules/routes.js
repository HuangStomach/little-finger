import { observable, action } from 'mobx';
import Loadable from 'react-loadable';

const List = Loadable({loader: () => import('view/List'), loading: () => null});
const Dashboard = Loadable({loader: () => import('view/Dashboard'), loading: () => null});
const Detail = Loadable({loader: () => import('@/List/Detail'), loading: () => null});

class Routes {
  @observable current = null;
  children = {
    'dashboard': {
      path: '/', 
      icon: 'dashboard', 
      text: '监控台', 
      component: Dashboard,
      routes: {}
    }, 
    'list': {
      path: '/list',
      icon: 'table',
      text: '服务器',
      component: List,
      routes: {}
    },
    'detail': {
      path: '/list/detail/:id',
      icon: 'table',
      text:'服务器详情',
      component: Detail,
      routes: {}
    }
  };

  @action
  active(key) {
    this.current = key;
  }
}

export default new Routes();