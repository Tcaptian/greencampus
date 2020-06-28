<template>
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
</template>

<script>
export default {
  name: 'query',
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
      let queryOptions = {
        startTime: this.startTime,
        endtime: this.endTime,
        timeType: this.timeType
      }
      this.$emit('submitParams', queryOptions)
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
</style>