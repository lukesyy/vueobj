
//通过本地把用户登录信息存到库里
const state = {
    list:   sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):null,//请求回来的数据
    
}

const mutations = {
    setlist(state, obj) {
        state.list = obj
        sessionStorage.setItem('list',JSON.stringify(obj))
    }
}
const actions = {
    getuserMsg(context, obj) {
        context.commit('setlist',obj)
    }
}
const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}