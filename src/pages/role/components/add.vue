<template>
  <div id="add">
    <el-dialog :title="isShow.title" :visible.sync="isShow.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>
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
import { reqRoleAdd, setRoleMsg } from "../../../util/request.js";
export default {
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
      menuList: "menu/menuList",
      reqroleListOne: "role/reqroleListOne",
    }),
  },
  data() {
    return {
      width: "160px",
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
    };
  },

  methods: {
    ...mapActions({
      reqestList: "role/reqestList",
      reqestMenu: "menu/reqestMenu",
    }),
    //添加
    addrole() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      reqRoleAdd(this.form).then((res) => {
        this.hide();
        this.reqestList();
      });
    },
    //重置
    restForm() {
      this.form = {
        rolename: "",

        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    //修改
    setrole() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      setRoleMsg(this.form);
      this.hide();
    },
    hide() {
      this.isShow.isShow = false;
    },
    //更改form
    //修改的时候的from
    setForm(e) {
      this.form = e;
      let arr = JSON.parse(e.menus);
      //this.form.menus =  this.$refs.tree.setCheckedKeys(arr)
    
      setTimeout(() => {
        this.$refs.tree.setCheckedKeys(arr);
      }, 100);
    },
  },

  mounted() {
    if (this.menuList.length == 0) {
      this.reqestMenu();
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