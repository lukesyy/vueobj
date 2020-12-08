
import {reqMenuList} from '../../src/util/request'
const state = {
  menuList: []
}
const mutations = {
  getmenuList(state, res) {
    state.menuList = res
  }
}

const actions = {
  reqestMenu(context) {
    reqMenuList({istree:true}).then(res => {
      context.commit('getmenuList', res.data.list)
    })
  }
}
const getters = {
  menuList(state) {
    return  state.menuList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}
