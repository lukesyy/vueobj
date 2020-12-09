<template>
  <div class="box1">
    <template>
      <el-table :data="goodsList" style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="id" label="商品编号"  width="100">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"  width="100">
      </el-table-column>
       <el-table-column prop="price" label="商品价格"  width="100">
      </el-table-column>
       <el-table-column prop="market_price" label="市场价格" width="100">
      </el-table-column>
       <el-table-column label="图片" sortable >
        <template slot-scope="scope"> 
          <img :src="$preImg+scope.row.img" alt="">
        </template>
      </el-table-column>

        <el-table-column prop="status" label="是否新品" width="100">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.isnew == 1"
              >是</el-button
            >
            <el-button type="info" disabled v-else>否</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否热卖" width="100">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.ishot == 1"
              >是</el-button
            >
            <el-button type="info" disabled v-else>否</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="info" disabled v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
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
import { reqgoodsDel } from "../../../util/request";
export default {
 

  computed: {
    ...mapGetters({
      goodsList: "goods/goodsList",
    
    }),
  },
  methods: {
    ...mapActions({
    
      getGoodsMsg: "goods/getGoodsMsg",
   
    }),
   
   

    edit(row) {
      this.$emit("edit", row);
    },
    deleteOne(id) {
      reqgoodsDel({ id: id }).then((res) => {
         alert(res.data.msg)
      this.getGoodsMsg(); 
      });
    },
  },
  mounted() {
    
   
    this.getGoodsMsg();
    
  },
};
</script>

<style  scoped>
.box1 {
  position: relative;
  padding-bottom: 50px;
}
img{
  width: 80px;
  height: 80px;
}
/* .fy {
  position: absolute;
  right: 30px;
  bottom: 0px;
} */
</style>