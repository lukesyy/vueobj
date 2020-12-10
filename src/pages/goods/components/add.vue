<template>
  <div id="add">
    <el-dialog
      :title="isShow.title"
      :visible.sync="isShow.isShow"
      @opened.once="changeEditor"
    >
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="--请选择--"
            @change="getChil"
          >
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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

        <el-form-item label="商品规格" :label-width="width">
          <el-select
            v-model="form.specsid"
            placeholder="--请选择--"
            @change="getSpecChil"
          >
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in SpecList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="width">
          <el-select v-model="form.specsattr" placeholder="--请选择--" multiple>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in secondSpec"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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

        <el-form-item label="商品描述" :label-width="width">
          <!-- <textarea v-model="form.description" name="" id="" cols="30" rows="10"></textarea> -->
          <div id="div1"></div>
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
//富文本
import E from "wangeditor";
//vuex库
import { mapActions, mapGetters } from "vuex";
//请求
import {
  reqgoodsAdd,
  setgoodslise,
  getGoodsOne,
} from "../../../util/request.js";
export default {
  props: ["isShow"],
  data() {
    return {
      secondCate: [], //用于存放二级分类
      secondSpec: [], //用来存放规格属性
      width: "160px",
      imageUrl: null,
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        status: 1,
        isnew: 1,
        ishot: 1,
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
      SpecList: "spec/SpecList",
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
      getSpecMsg: "spec/getSpecMsg",
      getGoodsMsg: "goods/getGoodsMsg",
    }),

    //添加
    addrole() {
      this.form.description = this.editor.txt.html();
      console.log(this.form.description);
      reqgoodsAdd(this.form).then((res) => {
        this.getGoodsMsg();
        this.hide();
      });
    },
    //更改form
    //修改的时候的from
    restForm(id) {
      getGoodsOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + res.data.list.img;
        this.form.specsattr = this.form.specsattr.split(",");

        //设置 规格属性
        this.secondSpec = this.SpecList.find((item) => {
          return this.form.specsid == item.id;
        }).attrs;
        // 获取二级菜单
        this.getChil();
        //设置 富文本
        this.editor.txt.html(this.form.description);
      });
      log
    },

    //点击修改提交
    setrole() {
      this.form.description = this.editor.txt.html();

      setgoodslise(this.form);
      this.getGoodsMsg();
      this.hide();
    },
    // 页面加载完成创建富文本编辑器
    changeEditor() {
      this.editor = new E("#div1");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    hide() {
      this.isShow.isShow = false;
    },
    //获取二级菜单
    getChil() {
      this.secondCate = this.cateList.find((item) => {
        return this.form.first_cateid == item.id;
      }).children;
    },
    //获取商品属性里的属性规格
    getSpecChil() {
      this.form.specsattr = [];
      this.secondSpec = this.SpecList.find((item) => {
        return this.form.specsid == item.id;
      }).attrs;
    },
    //初始化 from 清空
    reForm() {
      this.editor.txt.html("  ");
      this.imageUrl = "";
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        status: 1,
        isnew: 1,
        ishot: 1,
      };
    },
  },

  mounted() {
    this.getSpecMsg();
    this.getCateMsg();
  },
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