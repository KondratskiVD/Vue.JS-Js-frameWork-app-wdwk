/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

import account from './modules/account';
import passwordRecovery from './modules/passwordRecovery';
import passwordReset from './modules/passwordReset';
import backoffice from './modules/backofice';
import finance from './modules/finance';
import notFound from './modules/404';
import creative from './modules/creative';
import rightholder from './modules/rightholder';
import registration from './modules/registration';
import store from '../store';


const routes = [];
const LOGIN = {
  path: '/login',
  name: 'login.index',
  component: () => import('@/views/Login/Index.vue'),

  // If the user needs to be a guest to view this page.
  meta: {
    guest: true,
  },
};
const root = {
  path: '/',
  meta: {
    auth: true,
  },
  beforeEnter: (to, from, next) => {
    next({ name: store.state.account.homepage });
  },
};
routes.push(account);
routes.push(passwordRecovery);
routes.push(passwordReset);
routes.push(LOGIN);
routes.push(rightholder);
routes.push(registration);
routes.push(creative);
routes.push(backoffice);
routes.push(finance);
routes.push(root);
routes.push(notFound);

export default routes;

