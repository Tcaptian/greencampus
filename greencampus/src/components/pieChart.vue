<template>
  <div id="pieChart"></div>
</template>

<script>
export default {
  name: 'pieChart',
  data () {
    return {
      seriesData: [

      ]
    }
  },
  props: {
    details: Array
  },
  watch: {
    details () {
      this.details.forEach(item => {
        this.seriesData.push({
          value: item.battery,
          name: item.regionName
        })
      })
      this.drawLine();
    }
  },
  methods: {
    drawLine () {
      var echarts = require('echarts')
      var pieChart = echarts.init(document.getElementById('pieChart'))
      var option = {
        title: {
            text: this.title2,
            left: 'center',
            subtext: '主要区域用能状况'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            // data: this.xData
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.seriesData,
          emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }]
      }
      pieChart.setOption(option)
    }
  }
}
</script>

<style>
  #pieChart{
    width: 600px;
    height: 400px;
    margin: 20px auto;
  }
</style>