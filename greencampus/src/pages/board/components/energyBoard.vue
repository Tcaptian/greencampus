<template>
  <div>
    <div class="welcome">
      <div class="welcome-left">
        <h1>你好，欢迎登录绿色校园能耗管理系统！</h1>
        <span>{{nowTime}}</span>
        <ul class="cost">
          <li>
            <span>本年总费用</span>
            <span>{{allFree}}元</span>
          </li>
          <li>
            <span>本月累计费用</span>
            <span>{{monthFree}}元</span>
          </li>
          <li>
            <span>月平均费用</span>
            <span>7564元</span>
          </li>
          <li>
            <span>同期环比</span>
            <span>-544元</span>
          </li>
        </ul>
      </div>
      
    </div>

    <ul class="chart">
      <li>
        <h3>本月主要区域用能状况</h3>
        <barChart :details="details"></barChart>
      </li>
      <li>
        <h3>本月主要区域用能占比</h3>
        <pieChart :details="details"></pieChart>
      </li>
    </ul>

  </div>
</template>

<script scoped>
import axios from 'axios'
export default {
  name: 'energyBoard',
  data () {
    return {
      pageName: '看板首页',
      allFree: '',
      monthFree: '',
      startTime: 0,
      endTime: 0,
      timeDayType: 'day',
      timeMonthType: 'month',
      nowTime: '',
      details: []
    }
  },
  created () {
    this.getNowTime()
    this.handleFree()
   
    // this.drawLine()
    // this.handleMainRegionConsume()
  },
  mounted(){
     this.getMainRegionConsume()
  },
  methods: {
    /* drawLine () {
      var echarts = require('echarts')
      var barChart = echarts.init(this.$refs.areaBarChart)
      barChart.setOption({
          title: {
              text: this.title,
              left: 'center',
              subtext: '示例图形'
          },
          tooltip: {},
          xAxis: {
              data: this.xData
              // data: this.xData
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      });
    }, */
    getNowTime () {
      var myDate = new Date()
      var startDate = new Date('January 1, 2020 00:00:00')
      var startTime = Date.parse(startDate)
      var endTime = Date.parse(myDate)
      this.startTime = startTime
      this.endTime = endTime
      this.nowTime = myDate.toLocaleString()
    },
    handleFree () {
      var that = this
      this.getFree(1577813710000, 1580060110000, this.timeDayType, function (free) {
        that.allFree = free
      })
      this.getFree(this.startTime, this.endTime, this.timeDayType, function (free) {
        that.monthFree = free
      })
    },
    getFree (startTime, endTime, timeType , callback) {
      var free = 0
      axios.get('api/GreenCampus/free/all', {
        params: {
          startTime: startTime,
          endTime: endTime,
          timeType: timeType
        }
      })
        .then(res => {
         free = parseInt(res.data.detail[0].free)
         callback(free)
        })
    },
    getMainRegionConsume () {

      // ctx.commit('getDetails', details)
      axios.get('api//GreenCampus/elec/mainRegion', {
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          timeType: 'day'
        }
      })
      .then(res => {
        // this.$store.dispatch('getDetails', res.data.detail)
        this.details = res.data.detail
      })

    }
  }
}
</script>

<style scoped>
  
  
  .welcome{
    width: 100%;
    height: 300px;
    padding-left: 40px;
    background-color: #5e99df;
    /* background:url(~@/assets/img/xust.jpeg) no-repeat right; */
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    
  }
  .welcome h1, .welcome span{
    color: white;
  }
  .welcome-left{
    margin-top: 40px;
  }
  .welcome .cost{
    width:100%;
    height: 150px;
    margin-top: 20px;
    display: flex;
  }
  .welcome .cost li{
    width: 180px;
    height: 100%;
    background-color: #71a5e1;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-right: 10px;
  }
  .welcome .cost li span{
    display: inline-block;
    font-size: 20px;
    margin-top: 25px;
  }
  .welcome .bgXust{
    width: 400px;
    height: 300px;
  }
  .welcome .bgXust img{
    width: 400px;
    height: 300px;
  }


  .chart{
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .chart li {
    width: 600px; 
    background-color: white;
  }
  .chart li h3{
    padding-left: 20px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .chart li .areaBarChart{
    width: 800px;
    height: 400px;
  }
  .list-name{
    width: 100%;
    height: 50px;
    margin-top:30px;
    background-color:beige;
    line-height: 50px;
    font-weight:bold;
    padding-left: 10px;
  }
  .list-name span{
    position:relative;
    left: 1000px;
  }
</style>