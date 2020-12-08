<template>
  <div id="add">
    <el-dialog :title="isShow.title" :visible.sync="isShow.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="--请选择--"
            @change="changePid"
            ><!-- 动态循环添加数据  菜单分类 -->
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option label="星星" value="el-icon-star-on">
              <i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="晴天" value="el-icon-sunny">
              <i class="el-icon-sunny"></i>
            </el-option>
            <el-option label="阴天" value="el-icon-cloudy">
              <i class="el-icon-cloudy"></i>
            </el-option>
            <el-option label="下雨" value="el-icon-light-rain">
              <i class="el-icon-light-rain"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择路径">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.name"
            ></el-option>
          </el-select>
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
        <el-button type="primary" @click="sendmenu" v-if="isShow.shows"
          >确 定</el-button
        >
        <el-button type="primary" @click="setmenu" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { indexRouters } from "../../../router/index";
import { reqMenuAdd, getMenuMsgOne, setMenuMsg } from "../../../util/request";
export default {
  props: ["isShow"],

  data() {
    return {
      width: "160px",
      form: {
        pid: "",
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouters: indexRouters,
      rules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        resource: [
          { required: true, message: "请选择菜单类型", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      reqestMenu: "menu/reqestMenu",
    }),
    //   取消弹框
    hide() {
      this.isShow.isShow = false;
    },
    //   添加操作
    sendmenu() {
      reqMenuAdd(this.form).then((res) => {
            this.reqestMenu();
        this.hide();
      });
  
    },
    restForm() {
      this.form = {
        pid: "",
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      };
    },
    //修改一条
    setmenu() {
      setMenuMsg(this.form).then((res) => {
        this.reqestMenu();
        this.hide();

      });
      console.log(this.menuList);
    },
    // 修改type的状态
    changePid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
      console.log(this.form.pid)
    },
    //更改form
    changeForm(e) {
      this.form = e;
    },
  },
};
</script>

<style  scoped>

#add{
  padding-top: 10px;
}
</style>