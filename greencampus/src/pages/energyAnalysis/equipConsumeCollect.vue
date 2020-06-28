<template>
  <div>
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
    <div  class="areaConsumeCollect">
    
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
 name: 'areaConsumeCollect',
 data () {
  return {
    time: 0,
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
    xData: ['无', '无'],
    seriesData: [
      {name: '无', value: 0},
      {name: '无', value: 0}
    ],
    agencyXData : [],
    agencySeriesData : [],
    areaTotalInfo: {
      regionName: '无',
      battery: 0,
      max: 0,
      min: 0,
      maxTime: '00:00:00',
      minTime: '00:00:00',
      mombattery: 0,
      yoybattery: 0
    },
    columns1: [
      {
          title: '用电类型',
          key: 'type'
      },
      {
          title: '比率',
          key: 'precentage'
      },
      {
          title: '平均值',
          key: 'average'
      },
      {
          title: '最大值',
          key: 'max'
      },
      {
          title: '最小值',
          key: 'min'
      }
    ],
    agencyData2: [],
    data2: [],
    showAreaList: false,
    insteadList: true
  }
 },
 mounted() {
   this.drawLine()
 },
 watch: {
   seriesData () {
      this.drawLine()
    }
 },
 methods: {
  getByType () {
    if(this.time == 0) {
      alert('请选择查询的时间')
      return
    }
    if(!this.$store.state.regionInfo.regionId) {
      alert('请选择要查询的区域')
      return
    }
    this.showAreaList = true
    this.insteadList = false
    axios.get('api//GreenCampus/elec/getByType', {
      params: {
        time: this.time,
        regionId: this.$store.state.regionInfo.regionId,
        timeType: this.timeType
      }
    }).then(res => {
      res.data.detail.forEach(item => {
        this.agencyXData.push(item.type)
        this.agencySeriesData.push({
          name: item.type,
          value: item.battery
        })
      });
      this.agencyData2 = res.data.detail
      this.agencyData2.shift()
      this.agencySeriesData.shift()
      this.agencyXData.shift()
      this.xData = this.agencyXData
      this.seriesData = this.agencySeriesData
      this.data2 = this.agencyData2
      this.agencyXData = []
      this.agencySeriesData = []
      this.agencyData2 = []
    }),
    axios.get('api/GreenCampus/elec/getComplex', {
      params: {
        deviceNumberList: this.deviceNumberList,
        time: this.time,
        regionId: this.$store.state.regionInfo.regionId,
        timeType: this.timeType
      }
    }).then(res=> {
      this.areaTotalInfo = res.data.detail
    })
  },
  drawLine () {
    var echarts = require('echarts')
    var pieChart = echarts.init(document.getElementById('areapieChart'))
    var option = {
      title: {
          text: this.title2,
          left: 'center',
          subtext: '区域用电类型占比'
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.xData
      },
      series: [{
        name: '能耗占比',
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
  },
  time1 (e) {
    var date = new Date(e)
    this.time = date.getTime()
  },
  time2 (e) {
    var date = new Date(e)
    this.endTime = date.getTime()
  },
  hanleQueryClick () {
   
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
  .areaConsumeCollect{
    width: 100%;
    display: flex;
  }
</style>