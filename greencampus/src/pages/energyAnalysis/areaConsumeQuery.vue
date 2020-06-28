<template>
  <div class="areaConsume">
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
           <Button type="info" @click="hanleQueryClick()">查询所有区域能耗</Button>
      </div>
    </div>
    <div class="content-list">
      <ol class="list-header">
        <li v-for="(item, index) of columns1" :key="index">{{item.title}}</li>
      </ol>
      <ul v-for="(item, index) of showList" :key="index">
        <li>{{index+1}}</li>
        <li>{{item.regionName}}</li>
        <li>{{item.consumeType}}</li>
        <li>{{item.battery}}</li>
      </ul>
      <h2 v-if="instead">暂无数据</h2>
    </div>
    <Page :total="dataCount" :page-size="pageSize" @on-change="handleChangePage" show-elevator/>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'areaConsume',
  data () {
    return {
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
      startTime: 0,
      endTime: 0,
      timeType: 'day',
      dataArea: [],
      dataCount: 0,
      pageSize: 5,
      showList: [],
      areaConsume: [],
      columns1: [
        {
          title: '序号',
          key: 'index'
        },{
          title: '区域',
          key: 'regionName'
        },{
          title: '能耗类型',
          key: 'consumeType'
        },{
          title: '能耗值',
          key: 'battery'
        }
      ],
      instead: true
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
      if(this.startTime ==  0) {
        alert('请输入起始时间')
        return
      }
      if(this.endTime == 0) {
        alert('请输入结束时间')
        return
      }
      this.instead = false;
      axios.get('api/GreenCampus/elec/allRegion', {
        params:{
          startTime: this.startTime,
          endTime: this.endTime,
          timeType: this.timeType
        }
      }).then(res => {
        this.areaConsume = res.data.detail
        this.areaConsume.forEach(item => {
          item.consumeType = '用电'
        })
        this.agency()
      })
      
    },
    agency () {
      this.dataCount = this.areaConsume.length;
      if(this.dataCount1 < this.pageSize) {
        this.showList = this.areaConsume
      } else {
        this.showList = this.areaConsume.slice(0, this.pageSize)
      }
    },
    handleChangePage (index) {
      let _start = (index - 1) * this.pageSize
      let _end = index * this.pageSize
      this.showList = this.areaConsume.slice(_start, _end)
    },
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
  .content-list{
    width: 100%;
    margin-top: 10px;
  }
  .content-list h2{
    width: 100%;
    height: 250px;
    background-color: white;
    line-height: 250px;
    text-align:center;
  }
  .content-list ul, .list-header{
    width: 100%;
    height: 48px;
    padding-left: 18px;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    justify-content: space-around;
  }
  .content-list ul:nth-child(2n) {
    background-color: #f8f8f9;
  }
  .content-list ul:hover{
    background-color: #f0faff;
  }
  .content-list .list-header{
    font-weight: bolder;
    background-color: #f8f8f9;
  }
  .content-list ul li, .list-header li{
    width: 20%;
    height: 48px;
    line-height: 48px;
    text-align:center;
  }
</style>