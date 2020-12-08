<template>
  <div>
    <template>
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="rolename" label="角色名称"> </el-table-column>

        <el-table-column prop="menus" label="角色权限"> </el-table-column>
      
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
    </template>
  </div>
</template>
 

<script>
import { mapGetters, mapActions } from "vuex";
import { deleRoleMsg } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      reqestList: "role/reqestList",
    }),

    edit(row) {
     
      this.$emit("edit", row);
   
    },
    deleteOne(id) {
      deleRoleMsg({ id: id }).then((res) => {
        this.reqestList();
      });
    },
  },
  mounted() {
    this.reqestList();
    
  },
};
</script>

<style  scoped>
</style>