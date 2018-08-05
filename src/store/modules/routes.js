import { observable, action } from 'mobx';
import Loadable from 'react-loadable';
const Lists = Loadable({loader: () => import('view/Lists'), loading: () => null});
const Stations = Loadable({loader: () => import('view/Stations'), loading: () => null});

class Routes {
  @observable current = null;
  children = {
    'stations': {
      path: '/', 
      icon: 'profile', 
      text: '监控台', 
      component: Stations
    }, 
    'lists': {
      path: '/list',
      icon: 'table',
      text: '服务器',
      component: Lists
    }
  };

  @action
  active(key) {
    this.current = key;
  }
}

export default new Routes();