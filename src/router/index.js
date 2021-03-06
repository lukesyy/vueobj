import Vue from 'vue'
import Router from 'vue-router'

const login = ()=>import('../pages/login.vue')
const index = ()=>import('../pages/index.vue')
const menu = ()=>import('../pages/menu/menu.vue')
const home = () => import('../pages/home/home.vue')
const controller = ()=>import('../pages/controller/controller')
const role = () => import('../pages/role/role')
const banner = ()=>import('../pages/banner/banner')
const vip = ()=>import('../pages/vip/vip')
const seckill = () => import('../pages/seckill/seckill')
const spec = () => import('../pages/spec/spec')
const goods = () => import('../pages/goods/goods')
const classify = ()=>import('../pages/classify/classify.vue')
Vue.use(Router)
export const indexRouters = [
  {
    path:'menu',
    component:menu,
    name:'菜单管理'
  },
  {
    path:'role',
    component:role,
    name:'角色管理'
  },
  {
    path:'controller',
    component:controller,
    name:'管理员管理'
  },
  {
    path:'classify',
    component:classify,
    name:'商品分类'
  },
  {
    path:'spec',
    component:spec,
    name:'商品规格'
  },
  {
    path:'goods',
    component:goods,
    name:'商品管理'
  },
  {
    path:'vip',
    component:vip,
    name:'会员管理'
  },
  {
    path:'banner',
    component:banner,
    name:'轮播图管理'
  },
  {
    path:'seckill',
    component:seckill,
    name:'秒杀活动'
  },

]
const router = new Router({
  routes: [
    {
      path: '/login',
    
      component: login
    },
    {
      path: '/',
      component:login
    },

    {
      path: '/index',
      component: index,
      children: [
        {
          path: 'home',
          component:home,
        }, 
        ...indexRouters,
        {
          path: '*',
          redirect:'home'
        },
      ]
    },
  ]
})
// 全局守卫
router.beforeEach((to, from, next) => {
  var list = sessionStorage.getItem('list')
  // 如果要去的是登录页面
 console.log(to);
  if (to.path == '/login' || to.path == '/') {
    //如果已经登录 就跳到首页
    if (list) {
      next("/index")
      alert("已经登录")
    } else {
      next()
    }
  } else {
    // 如果去的不是登录页面  则判断登录状态， 如果登录了直接next 否则返回登录页
    if (list) {
      next()
    } else {
      next("/login")
      alert("请先登录哦!")
    }
  }
})

export default router
