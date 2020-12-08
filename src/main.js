// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//静态资源
import './assets/css/reset.css'
import './assets/css/lib.css'
//图片添加的路径
Vue.prototype.$preImg = 'http://localhost:3000';
//ele  ui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//vuex仓库
import store from '../story/index'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
