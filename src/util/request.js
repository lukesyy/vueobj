

//-------------------发送请求--------------------

import axios from 'axios'
import qs from 'qs'


const baseUrl = '/api'
// 拦截器
axios.interceptors.response.use(res=>{
    console.log('---------本次请求地址:' + res.config.url + '----------')
    

   
        console.log(res)
  
   
    return res
})
//===============================================菜单====================================
// 菜单添加
export const reqMenuAdd = (arr) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data:arr
    })

}
// 菜单列表
export const reqMenuList = (istree) => {
    return axios({
        url: baseUrl + '/api/menulist',
        method: 'get',
        params:istree
    })

}
//获取一条数据
export const getMenuMsgOne = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: 'get',
        params:id
    })
}
//修改一条数据
export const setMenuMsg = (arr) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data:arr
    })

}
//删除一条数据
export const deleMenuMsg = (id) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data:id
    })

}

//========================================管理员============================================
//管理员添加
export const  reqUserAdd = (str) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data:str
    })

}
// 管理员列表  && 分页
export const reqUserList = (istree) => {
    return axios({
        url: baseUrl + '/api/userlist',
        method: 'get',
        params:istree
    })

}
//删除一条管理员信息
export const deleUserMsg = (id) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data:id
    })

}
//修改一条管理员信息
export const setUserMsg = (arr) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data:arr
    })

}
//获取一条数据
export const getUserMsgOne = (id) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: 'get',
        params:id
    })
}
//获取管理员总条数
export const getTotal = () => {
    return axios({
        url: baseUrl + '/api/usercount',
        method:"get"
    })
}

//=============================================角色==========================================

//角色添加
export const  reqRoleAdd = (str) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data:str
    })

}
// 角色列表
export const reqRoleList = (istree) => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: 'get',
        params:istree
    })

}
//删除一条角色信息
export const deleRoleMsg = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data:id
    })

}
//修改一条角色信息
export const setRoleMsg = (arr) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data:arr
    })

}
//获取一条角色数据
export const getRoleMsgOne = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: 'get',
        params:id
    })
}

//=======================================商品分类=====================================

// 商品分类列表
export const reqCateList = (istree) => {
    return axios({
        url: baseUrl + '/api/catelist',
        method: 'get',
        params:istree
    })

}
//商品分类添加
export const reqCateAdd = (data) => {
      // 由于上传的是文件 所以需要用qs转一下
      var form  = new FormData()
      // {pid:1,catename:'s',img,status}
      for(var i in data){
          form.append(i,data[i])
      }
    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data:form
    })

}
//商品分类修改

export const setCatelise = (str) => {
    var form  = new FormData()
    // {pid:1,catename:'s',img,status}
    for(var i in str){
        form.append(i,str[i])
    }
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data:form
    })

}
// 商品分类删除
export const reqcateDel=(id)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:id
    })
}
//=======================================商品管理=====================================

// 商品管理列表
export const reqgoodsList = (istree) => {
    return axios({
        url: baseUrl + '/api/goodslist',
        method: 'get',
        params:istree
    })

}
//商品管理添加
export const reqgoodsAdd = (data) => {
      // 由于上传的是文件 所以需要用qs转一下
      var form  = new FormData()
      // {pid:1,goodsname:'s',img,status}
      for(var i in data){
          form.append(i,data[i])
      }
    return axios({
        url: baseUrl + '/api/goodsadd',
        method: 'post',
        data:form
    })

}
//商品管理修改

export const setgoodslise = (str) => {
    var form  = new FormData()
    // {pid:1,goodsname:'s',img,status}
    for(var i in str){
        form.append(i,str[i])
    }
    return axios({
        url: baseUrl + '/api/goodsedit',
        method: 'post',
        data:form
    })

}
// 商品管理删除
export const reqgoodsDel=(id)=>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:'post',
        data:id
    })
}

//获取一条商品数据
export const getGoodsOne = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: 'get',
        params:id
    })
}
//=======================================商品添加=====================================

// 商品分类列表
export const reqSpecList = (istree) => {
    return axios({
        url: baseUrl + '/api/specslist',
        method: 'get',
        params:istree
    })

}
//商品分类添加
export const reqSpecAdd = (data) => {
     
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data:data
    })

}
//商品分类修改

export const setSpeclise = (str) => {
   
    return axios({
        url: baseUrl + '/api/specsedit',
        method: 'post',
        data:str
    })

}
// 商品分类删除
export const reqSpecDel=(id)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:id
    })
}


//==============================登录=====================================
//管理员登录 

export const postlogin=(data)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:'post',
        data:data
    })
}