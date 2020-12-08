<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      getCateMsg: "cate/getCateMsg",
    }),
  },

  mounted() {
   this.getCateMsg()
  },
  watch:{
      cateList:{
          
          handler(){
               // 基于准备好的dom，初始化echarts实例
               
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "商品销量",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: this.cateList.map(item=>
            item.catename
        )
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data:this.cateList.map(item=>item.children?item.children.length:0)
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
          }
      }
  }
};
</script>

<style scoped>
</style>