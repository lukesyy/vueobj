
import {reqSpecList} from '../../src/util/request'
const state = {
  SpecList: []
}
const mutations = {
  getSpecList(state, res) {
    state.SpecList = res

   
  }
}

const actions = {
  getSpecMsg(context) {
    reqSpecList().then(res => {
var arr = res.data.list
      
      arr.forEach(item => {
        item.attrs = JSON.parse(item.attrs)
       
      });
    
      context.commit('getSpecList', arr)
    })
  }
}
const getters = {
    SpecList(state) {
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
