
import {reqCateList} from '../../src/util/request'
const state = {
  cateList: []
}
const mutations = {
  getmenuList(state, res) {
    state.cateList = res
  }
}

const actions = {
  getCateMsg(context) {
    reqCateList({istree:true}).then(res => {
      context.commit('getmenuList', res.data.list)
    })
  }
}
const getters = {
    cateList(state) {
    return  state.cateList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}
