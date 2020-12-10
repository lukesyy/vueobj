<template>
  <div>
    <el-container>
      <el-aside width="210px">
        <el-menu
          default-active="2"
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >


          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
<div v-for="item in lists.menus" :key="item.id">


          <el-submenu :index="'id'+item.id" v-if="item.children">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="ele in item.children" :key="ele.id" :index="'/index'+ele.url">{{ele.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
 <el-menu-item index="/index/" v-else>{{item.title}}  </el-menu-item>
</div>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部区域 -->
        <el-header> <span>{{this.list.username}}</span>  <el-button type="danger" @click="exit">点击退出</el-button> </el-header>
        <!-- 内容区域 -->
        <el-main>
          <!--   二级路由出口       -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
      lists:{},
    }
  },
  computed:{
...mapGetters({
    list:'login/list'
  })
  }
  ,
  methods: {
   ...mapActions({
getuserMsg:'login/getuserMsg'
      }),
 exit() {
        this.$confirm('即将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!',
            
          });
         
          sessionStorage.clear();
          this.$router.push('/login')
        }).catch(() => {
                    this.$message({
            type: 'info',
            message: '已取消退出'
          });  
        });
      }
     
      
  },
  mounted() {
   this.lists = JSON.parse (sessionStorage.getItem('list'))
  },
};
</script>

<style  scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
 
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-container {
  height: 100vh;
}
</style>