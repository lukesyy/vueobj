<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
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
  components: { list, add },
  methods: {
    willAdd() {
      this.isShow = {
        isShow: true,
        shows: true,
        title: "角色添加",
      };
         this.$refs.one.restForm();

    },
     //修改
    edit(e) {
      
    
       this.isShow = {
        isShow: true,
        shows: false,
        title:"角色修改"
      };
      this.$refs.one.setForm(e);
    },
  },
};
</script>

<style  scoped>
</style>