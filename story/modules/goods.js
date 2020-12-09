
import {reqgoodsList} from '../../src/util/request'
const state = {
  SpecList: []
}
const mutations = {
  getSpecList(state, res) {
    state.SpecList = res

   
  }
}

const actions = {
  getGoodsMsg(context) {
    reqgoodsList().then(res => {
var arr = res.data.list
      
     
    
      context.commit('getSpecList', arr)
    })
  }
}
const getters = {
    goodsList(state) {
    return  state.SpecList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}
