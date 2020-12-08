<template>
  <div id="add">
    <el-dialog :title="isShow.title" :visible.sync="isShow.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="width">
          <el-select v-model="form.pid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->

        <el-form-item label="图片" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { reqCateAdd, setCatelise } from "../../../util/request.js";
export default {
  props: ["isShow"],
  data() {
    return {
      width: "160px",
      imageUrl: null,
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
       defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
    }),
    
  },
  methods: {
      //上传图片
    changeImg(e) {
      console.log(e); //这是获取到的文件也就是上传的那张图片
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      this.form.img = file;
    },
    ...mapActions({
      getCateMsg: "cate/getCateMsg",
    }),
    //添加
    addrole() {
      reqCateAdd(this.form).then((res) => {
        this.getCateMsg();
        this.hide();
      });
    },
    //更改form
    //修改的时候的from
    restForm(e) {
     console.log(e);
      this.form = e;
       this.imageUrl = this.$preImg+e.img
      console.log( this.imageUrl);
    },
    //点击修改提交
    setrole() {
      setCatelise(this.form);
      this.hide();
    },
    hide() {
      this.isShow.isShow = false;
    },
    //初始化 from 清空
    reForm() {
        this.imageUrl =''
      this.form = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
    },
  },

  mounted() {},
  props: ["isShow"],
};
</script>

<style  scoped>
#add {
  padding-top: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 2px dashed #ccc;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>