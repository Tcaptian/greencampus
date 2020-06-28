<template>
    <div ref="barChart" id="barChart"></div>
</template>

<script>
export default {
  name: 'barChart',
  data () {
    return {
      // detail: [],
      xData: [],
      yData: [],
    }
  },
  props: {
    details: Array
  },

  watch: {
    details () {
      this.details.forEach(item => {
        this.xData.push(item.regionName)
        this.yData.push(item.battery)
      });
      this.drawLine();
    }
  },
  methods: {
    drawLine () {
      var echarts = require('echarts')
      var barChart = echarts.init(document.getElementById('barChart'))

      barChart.setOption({
          title: {
              text: this.title,
              left: 'center',
              subtext: '主要区域用能状况'
          },
          tooltip: {},
          xAxis: {
            //  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              data: this.xData,
              type: 'category',
              boundaryGap: false,
          },
          yAxis: {
            type: 'value'
          },
          series: [{
              name: '销量',
              type: 'line',
              data: this.yData
          }]
      });
    }
  }
}
</script>

<style>
  #barChart{
    width: 600px;
    height: 400px;
    margin: 20px auto;
  }
</style>