<template>
  <div class="box1">
    <template>
      <el-table :data="userlist" border style="width: 100%">
        <el-table-column prop="id" label="用户编号"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>

        <el-table-column prop="rolename" label="所属角色"> </el-table-column>

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
              @click="deleteOne(scope.row.uid)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <el-pagination
      class="fy"
      :page-size="size"
      @current-change="getIspage"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
 

<script>
import { mapGetters, mapActions } from "vuex";
import { deleUserMsg, getTotal } from "../../../util/request";
export default {
  data() {
    return {
      val:0,
     
    };
  },

  computed: {
    ...mapGetters({
      userlist: "user/userlist",
      size: "user/size",
      total:'user/total'
    }),
  },
  methods: {
    ...mapActions({
      reqGetUser: "user/reqGetUser",
      reqUserList: "user/reqUserList",
      setPage: "user/setPage",
      mysetTotal:'user/mysetTotal'
    }),
   
    getIspage(val) {
     this.val = val
 this.setPage(this.val);
      //this.reqGetUser();
    },


    edit(row) {
      this.$emit("edit", row);
    },
    deleteOne(id) {
     
      deleUserMsg({ uid: id }).then((res) => {
      
       if(this.userlist.length%2 == 1){
 
        this.setPage(this.val - 1);
       }
      this.reqGetUser();
       this.mysetTotal()
         
      });
    },
  },
  mounted() {
    this.mysetTotal()
   
    this.reqGetUser();
    
  },
};
</script>

<style  scoped>
.box1 {
  position: relative;
  padding-bottom: 50px;
}
.fy {
  position: absolute;
  right: 30px;
  bottom: 0px;
}
</style>