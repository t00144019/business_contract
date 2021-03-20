import Vue from 'vue'
import VueRouter from 'vue-router'
const Register = () => import('views/Register');
const LoginByPwd = () => import('views/login/LoginByPwd');
const LoginBySmsCode = () => import('views/login/LoginBySmsCode');
const ResetPwd = () => import('views/ResetPwd');

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/loginbypwd'
  },
  {
    path: '/loginbypwd',
    component: LoginByPwd

  },
  {
    path: '/loginbysmscode',
    component: LoginBySmsCode
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/resetpwd',
    component: ResetPwd
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
});

export default router
