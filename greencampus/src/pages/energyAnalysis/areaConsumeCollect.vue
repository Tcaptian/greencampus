<template>
  <div class="areaCollect">
    <div class="query">
      查询方案：
      <div>
        时间类型
        <Select v-model="timeType" style="width:200px">
          <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <span>选择时间：</span>
        <DatePicker  placeholder="请选择查看时间" style="width: 200px" format="yyyy-MM-dd" @on-change="time1"></DatePicker>
      </div>
      <div>
          <Button type="info" @click="hanleQueryClick()">查询</Button>
      </div>
    </div>
    <div  class="areaConsumeCollect">
      <div id="areapieChart"></div>
      <div class="areaRecord">
        <h4>区域能耗信息</h4>
        <div class="areaTotal">
          <span>区域名称: {{this.areaTotalInfo.regionName}}</span>
          <span>区域能耗: {{this.areaTotalInfo.battery}} KW/h</span>
          <span>最大值： {{this.areaTotalInfo.max}} KW/h -{{this.areaTotalInfo.maxTime}}</span>
          <span>最小值： {{this.areaTotalInfo.min}} KW/h -{{this.areaTotalInfo.minTime}}</span>
          <span>较上月： {{this.areaTotalInfo.mombattery}} KW/h</span>
          <span>较去年： {{this.areaTotalInfo.yoybattery}} KW/h</span>
        </div>
               <!-- <span>区域名称： {{this.regionName}}</span>
          <span>该区域总能耗：{{this.consumeTotal}} KW/h</span> -->
          <!-- <span  v-for="(item, index) of seriesData" :key="index">
            {{item.name}}:  {{item.value}} KW/h
          </span> -->
          <!-- <Table height="260" :columns="columns1" :data="data2"></Table> -->
      
          <ol class="list-header">
            <li v-for="(item,index) of columns1" :key="index">{{item.title}}</li>
          </ol>
          <ul v-for="(item,index) of data2" :key="index" v-if="showAreaList">
            <li>{{item.type}}</li>
            <li>{{item.precentage}}</li>
            <li>{{item.average}}</li>
            <li>{{item.max}}</li>
            <li>{{item.min}}</li>
          </ul>
          <h2 class="insteadList" v-if="insteadList">暂无数据</h2>
       
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
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
  hanleQueryClick () {
    this.getByType()
  }
 }
}
</script>

<style scoped>
  .areaConsumeCollect{
    width: 100%;
    display: flex;
  }
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
  .collectChart{
    width: 50%;
    margin-right: 20px;
  }
  .collectChart h3, .collectTotal h3{
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .collectTotal{
    width: 50%;
  }
   #areapieChart{
    width: 400px;
    height: 400px;
    background-color: white;
    padding-top: 10px;
    margin-right: 10px;
  }
  .areaRecord{
    width: 100%;
  }
  .areaRecord  .areaTotal{
    width: 100%;
    height: 120px;
    background:white;
    padding-top: 20px;
    padding-left: 20px;
    border-bottom: 1px #ccc dashed;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .areaRecord .areaTotal span{
    width: 300px;
  }
  .areaRecord ul, .areaRecord .list-header{
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    justify-content: space-between;
    padding:0 20px;
    align-items: center;
  }
  .areaRecord ul li, .areaRecord li{
    width: 100px;
  }
  .areaRecord ul{
    background-color:white;
  }
  .areaRecord .list-header{
    font-weight: bolder;
  }
  .insteadList{
    width: 100%;
    height: 200px;
    background-color:white;
    text-align:center;
    line-height: 200px;
  }
</style>