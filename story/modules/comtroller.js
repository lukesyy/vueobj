
import {reqUserList,getTotal} from '../../src/util/request'
const state = {
  userList: [],
  page: 1,
  size: 2,
  total:0
}
const mutations = {
  getmenuList(state, res) {
    state.userList = res
  },
  mygetTotal(state, res) {
    state.total = res
  },
  //修改当前页的配置  page  size
  getPage(state, page) {
    state.page = page
  }
}

const actions = {
  reqGetUser(context) {
    //page 页数   size 每页个数
    reqUserList({ page: context.state.page, size: context.state.size }).then(res => {
      
      context.commit('getmenuList', res.data.list)
    })
  },
  //总数
  mysetTotal(context) {
    getTotal().then(res => {
      
      context.commit("mygetTotal", res.data.list[0].total)
    })
    
  },
  //修改当前页的配置  page  size
  setPage(context,page) {
    context.commit('getPage', page)
    context.dispatch('reqGetUser')
  }
}
const getters = {
    userlist(state) {
    return  state.userList
  },
  total(state) {
    return  state.total
  },
    size(state) {
    return  state.size
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}
