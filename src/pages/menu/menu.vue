<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <add :isShow="isShow" ref="one"></add>
    <list @edit="edit($event)"></list>
  </div>
</template>

<script>
import add from "./components/add";
import list from "./components/list";

export default {
  data() {
    return {
      isShow: {
        isShow: false,
        shows: true,
      },
    };
  },
  methods: {
    //点击添加
    willAdd() {
      this.$refs.one.restForm()
      this.isShow = {
        isShow: true,
        shows: true,
        title:'菜单添加'
      };
    },
    //修改
    edit(e) {
      this.$refs.one.changeForm(e);
    
       this.isShow = {
        isShow: true,
        shows: false,
        title:"菜单修改"
      };
      
    },
  },
  components: {
    add,
    list,
  },
};
</script>

<style  scoped>
</style>