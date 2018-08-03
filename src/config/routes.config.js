import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;
const Lists = Loadable({loader: () => import("../view/Lists.jsx"), loading: Loading});
const Stations = Loadable({loader: () => import("../view/Stations.jsx"), loading: Loading,});

const ROUTES = [
  {
    key: 'Stations',
    link: '/',
    iconType: 'profile',
    text: '监控台',
    component: Stations
  }, {
    key: 'Lists',
    link: '/list',
    iconType: 'table',
    text: '服务器列表',
    component: Lists
  },
];

export {ROUTES};