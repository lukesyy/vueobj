<template>
  <div class="box1">
    <template>
      <el-table
        :data="SpecList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="id" label="规格编号"> </el-table-column>
        <el-table-column prop="specsname" label="规格名称"> </el-table-column>


        <el-table-column label="规格属性" sortable width="180">
          <template slot-scope="scope">
            <el-tag class="tag" v-for="item in scope.row.attrs" :key="item.id">{{
              item.value
            }}</el-tag>
          </template>
        </el-table-column>

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
import { reqcateDel,reqSpecDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      SpecList: "spec/SpecList",
    }),
  },
  methods: {
    ...mapActions({
      getSpecMsg: "spec/getSpecMsg",
    }),

    edit(row) {
      this.$emit("edit", row);
    },
    deleteOne(id) {
      reqSpecDel({ id: id }).then((res) => {
        this.getSpecMsg();
        alert(res.data.msg);
      });
    },
  },
  mounted() {
    this.getSpecMsg();
  },
};
</script>

<style  scoped>
.box1 {
  position: relative;
  padding-bottom: 50px;
}
img {
  width: 80px;
  height: 80px;
}
.tag {
  margin-right: 2px;
}
/* .fy {
  position: absolute;
  right: 30px;
  bottom: 0px;
} */
</style>