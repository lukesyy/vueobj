<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <add :isShow="isShow" ref="one"></add>
    <list @edit = "edit($event)" ></list>
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
  components: {
    add,
    list,
  },
  methods: {
    willAdd() {
      this.$refs.one.reForm()
      this.isShow = {
        isShow: true,
        shows: true,
        title: "添加商品分类",
      };
    },
    edit(e){
       this.$refs.one.restForm(e);
      this.isShow = {
        isShow: true,
        shows: false,
        title: "修改商品分类",
      };
    }
  },
};
</script>

<style  scoped>
</style>