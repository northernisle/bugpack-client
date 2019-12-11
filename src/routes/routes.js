import Login from './Login';
import Join from './Join';

const routes = [
  {
    path: '/',
    component: () => null,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/join',
    component: Join,
    exact: true
  }
];

export default routes;