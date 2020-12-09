import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import menu from './modules/menu.js'
import  role from './modules/role.js'
import  user from './modules/comtroller.js'
import  cate from './modules/cate.js'
import  spec from './modules/spec.js'
import  login from './modules/login.js'
import  goods from './modules/goods.js'
export default new Vuex.Store({
    modules: {
        menu,
        role,
        user,
        cate,
        spec,
        login,
        goods
   }
})


