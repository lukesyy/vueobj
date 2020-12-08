import { reqRoleList } from '../../src/util/request'
const state = {
  roleList: [],
  roleListOne:{},
  }
  const mutations = {
    getmenuList(state, res) {
      state.roleList = res
    },
    getroleListOne(state, res) {
      state.roleListOne=res
    }
  }
  
  const actions = {
    reqestList(context) {
        reqRoleList({istree:true}).then(res => {
        context.commit('getmenuList', res.data.list)
      })
    },
    reqroleListOne(context,id) {
      roleListOne(id).then(res => {
        context.commit('getroleListOne',res.data.list)
      })
    }
  }
  const getters = {
    roleList(state) {
      return  state.roleList
    },
    roleListOne(state) {
      return state.roleListOne
    }
  }
  
  export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
  }
  