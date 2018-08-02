import AsyncCompnent from "../components/common/HighOrderComponents/AsyncComponent";

const PageHome = AsyncCompnent(() => import("../view/PageHome.jsx"));
const PageList = AsyncCompnent(() => import("../view/PageList.jsx"));
const PageStation = AsyncCompnent(() => import("../view/PageStation.jsx"));

const ROUTES = [
  {
    key: '/',
    link: '/',
    iconType: 'home',
    text: 'Home',
    component: PageHome
  }, {
    key: 'Station',
    link: '/station',
    iconType: 'profile',
    text: '监控台',
    component: PageStation
  }, {
    key: 'List',
    link: '/list',
    iconType: 'profile',
    text: '服务器列表',
    component: PageList
  },
];

export {ROUTES};