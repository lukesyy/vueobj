<template>
  <div id="add">
    <el-dialog :title="isShow.title" :visible.sync="isShow.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select
            v-model="form.roleid"
            placeholder="--请选择--"
        
          >
            <!-- 动态循环添加数据  菜单分类 -->
            
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        用户名:
        <el-input placeholder="请用户名" v-model="form.username"></el-input>

        密码:
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="addrole" v-if="isShow.shows"
          >确 定</el-button
        >
        <el-button type="primary" @click="setrole" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqUserAdd,setUserMsg,getTotal } from "../../../util/request.js";
export default {
  props: ["isShow"],
  data() {
    return {
      width: "160px",
      form: {
        roleid: '',
        username: "",
        password: "",
        status: 1,
      },
    };
  },
   computed: {
    ...mapGetters({
      roleList: "role/roleList",
      userlist:'user/userlist',
      total:'user/total'
    }),
  },
  methods: {
    ...mapActions({
      reqestList: "role/reqestList",
  reqGetUser: "user/reqGetUser",
     setPage:'user/setPage',
      mysetTotal:'user/mysetTotal'
    }),
    //添加
    addrole() {
    

      reqUserAdd(this.form).then((res) => {
        
          
 
        this.mysetTotal()
       
        getTotal()
        this. reqGetUser();
        this.hide();
       
       
      });
    },
    //更改form
    //修改的时候的from
    restForm(e) {
      
      this.form=e
      this.form.password = ""
    },
    //修改
    setrole() {
  
      setUserMsg(this.form);
      this.hide();
    },
    hide() {
      this.isShow.isShow = false;
    },
    //初始化 from 清空
   reForm() {
      this.form = {
        roleid: '',
        username: "",
        password: "",
        status: 1,
      }
    },
   
  },

  mounted() {
    if (this.roleList.length == 0) {
      this.reqestList();
    }
  },
  props: ["isShow"],
};
</script>

<style  scoped>
#add {
  padding-top: 10px;
}
</style>