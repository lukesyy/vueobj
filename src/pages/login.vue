<template>
  <div>
    <div class="wrap">
      <div class="box">
        <h2>登录</h2>
        <p><input type="text" v-model="user.username"/></p>
        <p><input type="text" v-model="user.password"  @keyup.enter="goIndex"/> </p>
        <el-button type="primary" round @click="goIndex" >登录</el-button>
       
      </div>
    </div>
  </div>
</template>

<script>
import { postlogin } from "../util/request";
import {mapActions,mapGetters} from 'vuex'
export default {
data() {
    return {
       user: {
        username: "",
        password: "",
      },
    }
},
    methods: {
      ...mapActions({
getuserMsg:'login/getuserMsg'
      }),
        goIndex(){
           postlogin(this.user).then(res=>{
            
if(res.data.code==200){
  
this.getuserMsg(res.data.list)
  this.$router.push('index/home')
  
}else{
   alert(res.data.msg)
   this.getuserMsg(res.data.list)
}
           })
             
        }
    },
};
</script>

<style  scoped>
.wrap {
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  background-image: linear-gradient(to right, rgb(11, 102, 105) , rgb(15, 49, 94));
}
.box {
  margin: auto;
  padding: 40px 50px;
  background-image: linear-gradient( rgb(39, 108, 110) , rgb(84, 36, 112));
  border-radius: 20px;
  box-sizing: border-box;
}
p {
  margin: 30px 0px;
}
input{
    height: 20px;
    outline:none;
}
</style>