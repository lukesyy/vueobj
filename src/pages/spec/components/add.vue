<template>
  <div id="add">
    <el-dialog :title="isShow.title" :visible.sync="isShow.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>



        <el-form-item 
        label="规格属性" :label-width="width" 
        v-for="(item,index) in arrAttr " :key="index">
          <el-row>
            <el-col :span="18">
              <el-input v-model="item.value" autocomplete="off"> </el-input>
            </el-col>
            <el-col :span="6"> <el-button type="primary" @click="addData" v-if='index==0'>新增规格属性</el-button><el-button type="danger" v-else @click="delData(index)" >删除</el-button></el-col>
          </el-row>
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
import { reqSpecAdd, setSpeclise } from "../../../util/request.js";
export default {
  props: ["isShow"],
  data() {
    return {
      width: "160px",
      form: {
        specsname: "1",
        attrs: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
       arrAttr: [
        {
          value: "",
        },
        
      ],
    };
  },
  computed: {
    ...mapGetters({
      SpecList: "spec/SpecList",
    }),
  },
  methods: {
    //增加属性规格
   addData(){
this.arrAttr.push({value:''})
   },
   //删除属性规格
   delData(i){
this.arrAttr.splice(i, 1)
   },
    ...mapActions({
      getSpecMsg: "spec/getSpecMsg",
    }),
    //添加
    addrole() {

      this.form.attrs = JSON.stringify(this.arrAttr)
      reqSpecAdd(this.form).then((res) => {
        this.getSpecMsg();
        this.hide();
        
      });
    },
    //更改form
    //修改的时候的from
    restForm(e) {
this.arrAttr = e.attrs
      
      this.form = e;
    },
    //点击修改提交
    setrole() {
       this.form.attrs = JSON.stringify(this.form.attrs)
      setSpeclise(this.form);
     this.form.attrs = JSON.parse(this.form.attrs)
      this.hide();
    },
    hide() {
      this.isShow.isShow = false;
    },
    //初始化 from 清空
    reForm() {
      this.arrAttr = [
        {
          value: "",
        },
        
      ]
      this.form = {
        specsname: "",
        attrs: "",
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