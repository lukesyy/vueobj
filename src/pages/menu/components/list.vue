<template>
  <div>
   
      <el-table :data="menuList"  style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
       <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="info" disabled v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteOne(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
 
  </div>

 
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { deleMenuMsg } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      reqestMenu: "menu/reqestMenu",
    }),

    edit(id) {
      this.$emit("edit", id);
      console.log(id);
    },
    deleteOne(id) {
      deleMenuMsg({ id: id }).then((res) => {
        this.reqestMenu();
        alert(res.data.msg)
      });
    },
  },
  mounted() {
    this.reqestMenu();
  },
};
</script>

<style  scoped>
</style>