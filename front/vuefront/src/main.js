import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "assets/css/base.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.path === '/loginbypwd'){
    next();
  }else{
    let token =window.localStorage.token;
    if(token ==='null' || token ==='' || token === undefined){
      next('/loginbypwd');
    }else{
      next();
    }
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
