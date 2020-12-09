
//通过本地把用户登录信息存到库里
const state = {
    list: {}
    
}

const mutations = {
    setlist(state, obj) {
        state.list = obj ? obj : {}
        //如果本地有就存进来 如果没有就默认空对象
        console.log(obj);
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