<template>
  <div id="lineChart">
    
  </div>
</template>

<script>
export default {
  name: 'lineChart',
  data () {
    return {
      legendData: [],
      useSeriesData: this.seriesData,
      useXData: this.xData,
      // useRegionName: this.regionName
      showChart: this.$store.state.showChart
    }
  },
  props: {
    seriesData: Array,
    xData:Array
  },
  mounted () {
    
  },
  watch: {
    showChart() {
      this.drawLine()
    }
  },
  methods: {
    drawLine () {
      var echarts = require('echarts')
      var lineChart = echarts.init(document.getElementById('lineChart'))
      var option = {
        title: {
          text: '能耗趋势分析'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,

          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: this.useXData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // name: this.regionName,
          name:'能耗趋势分析',
          type: 'line',
          stack: '能耗',
          // data: [120, 132, 101, 134, 90, 230, 210]
          data: this.useSeriesData
        },]
      }
      lineChart.setOption(option)
    }
  }
}
</script>

<style>
  #lineChart{
    width:100%;
    height: 400px;
  }
</style>