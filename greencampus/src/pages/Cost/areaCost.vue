<template>
  <div class="areaCost">
    <div class="query">
      查询方案：
      <div>
        时间类型
        <Select v-model="timeType" style="width:200px">
          <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <span>时间范围：</span>
        <DatePicker  placeholder="请选择开始时间" style="width: 200px" format="yyyy-MM-dd" @on-change="time1"></DatePicker>
        <DatePicker placeholder="请选择结束时间" style="width: 200px"  format="yyyy-MM-dd" @on-change="time2"></DatePicker>
      </div>
      <div>
          <Button type="info" @click="hanleQueryClick()">查询</Button>
      </div>
    </div>
    <div class="freeChart">
      <div class="mainareaFreeRate">
        <h3>主要区域费用占比</h3>
        <div id="mainAreaFree"></div>
      </div>
      <div class="areaFreeTrendAn">
        <h3>费用消耗趋势</h3>
        <div id="areaFreeTrend"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'areaQuery',
  data () {
    return {
      startTime: 0,
      endTime: 0,
      timeType: 'day',
      timeList: [
        {
            value: 'year',
            label: '年'
        },
        {
            value: 'month',
            label: '月'
        },
        {
            value: 'day',
            label: '日'
        },
      ],
      mainAreaRate: [
        {
          name: '示例',
          value: 0
        }
      ],
      agencyMainAreaRate: [],
      areaFreeTrend: [
        1, 2,1, 1
      ],
      agencyAreaFreeTrend: [],
      agencyXFreeData: [],
      xFreeData : [
        '1', '2', '3', '4'
      ],

    }
  },
  mounted () {
    this.mainAreadrawLine()
    this.freeTrendLine()
  },
  watch: {
    mainAreaRate () {
      this.mainAreadrawLine()
    },
    areaFreeTrend () {
      this.freeTrendLine()
    }
  },
  methods: {
    time1 (e) {
      var date = new Date(e)
      this.startTime = date.getTime()
    },
    time2 (e) {
      var date = new Date(e)
      this.endTime = date.getTime()
    },
    hanleQueryClick () {
      if(this.startTime == 0) {
        alert('请选择起始时间')
        return
      }
      if(this.endTime == 0) {
        alert('请选择结束时间')
        return
      }
      axios.get('api/GreenCampus/free/mainRegion', {
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          timeType: this.timeType,
        }
      }).then(res => {
        res.data.detail.forEach(item => {
          this.agencyMainAreaRate.push({
            name: item.regionName,
            value: item.free
          })
        })
        this.mainAreaRate = this.agencyMainAreaRate
        this.agencyMainAreaRate = []
      })
      axios.get('api/GreenCampus/free/all', {
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          timeType: this.timeType,
        }
      }).then(res => {
        res.data.detail.forEach(item => {
          this.agencyXFreeData.push(item.time)
          this.agencyAreaFreeTrend.push(item.free)
        })
        this.agencyXFreeData.shift()
        this.agencyAreaFreeTrend.shift()
        this.xFreeData = this.agencyXFreeData
        this.areaFreeTrend = this.agencyAreaFreeTrend
        this.agencyXFreeData = []
        this.agencyAreaFreeTrend = []
      })
    },
    mainAreadrawLine () {
      var echarts = require('echarts')
      var pieChart = echarts.init(document.getElementById('mainAreaFree'))
      var option = {
        title: {
            text: this.title2,
            left: 'center',
            subtext: '示例图形'
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
          name: '',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.mainAreaRate,
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
    },
    freeTrendLine () {
      var echarts = require('echarts')
      var lineChart = echarts.init(document.getElementById('areaFreeTrend'))
      var option = {
        title: {
          text: ''
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
          data: this.xFreeData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // name: this.regionName,
          name:'',
          type: 'line',
          stack: '能耗',
          // data: [120, 132, 101, 134, 90, 230, 210]
          data: this.areaFreeTrend
        },]
      }
      lineChart.setOption(option)
    }
  }
}
</script>

<style scoped>
  .query{
    width: 100%;
    height: 78px;
    background-color: #f8f8f9;
    display: flex;
    justify-content: space-around;
    align-items:center;
    border-radius: 10px;
    overflow: hidden;
  }
  .freeChart{
    width: 100%;
    display: flex;
  }
  .freeChart h3{
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .mainareaFreeRate {
    width: 30%;
    background: white;
  }
  
  .areaFreeTrendAn{
    width: 70%;
    background: white;
    margin-left: 20px;
  }
  #mainAreaFree{
    width: 400px;
    height: 400px;
  }
  #areaFreeTrend{
    width: 100%;
    height: 400px;
  }
</style>