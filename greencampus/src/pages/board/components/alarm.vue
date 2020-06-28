<template>
  <div class="alarmRecord">
    <div class="alarmHeader">
       <Button @click="handleNoRead()">未读消息</Button>
        <Button @click="handleReaded()">已读消息</Button>
    </div>
    <h3>告警记录</h3>
    <Table border :columns="columns7" :data="data6" highlight-row v-if="showReaded"></Table>
    <Table border :columns="columnsed" :data="data6" highlight-row v-if="showNotRead"></Table>
    <div class="page">
      <Button type="info" @click="handleBeforePage()">上一页</Button>
      <span>第{{this.pageNo}}页</span>
      <Button type="info" @click="handleNextPage()">下一页</Button>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      columns7: [
        {
            title: '告警名称',
            key: 'alarmName',
        },
        {
            title: '告警类型',
            key: 'alarmType'
        },
        {
            title: '告警时间',
            key: 'alarmTime'
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.show(params.index)
                            }
                        }
                    }, '查看详情'),
                    h('Button', {
                        props: {
                            type: 'warning',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                const data = {
                                  alarmId: params.row.alarmId
                                }
                                const options = {
                                  method: 'PUT',
                                  headers: { 'content-type': 'application/x-www-form-urlencoded' },
                                  data: qs.stringify(data),
                                  url: 'api/GreenCampus/alarm/updateIsRead'
                                }
                                axios(options).then(res => {
                                  this.getAlarmRecord()
                                })
                            }
                        }
                    }, '未读')
                ]);
            }
        }
      ],
      columnsed: [
        {
            title: '告警名称',
            key: 'alarmName',
        },
        {
            title: '告警类型',
            key: 'alarmType'
        },
        {
            title: '告警时间',
            key: 'alarmTime'
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.show(params.index)
                            }
                        }
                    }, '查看详情'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                const data = {
                                  alarmId: params.row.alarmId
                                }
                                const options = {
                                  method: 'DELETE',
                                  headers: { 'content-type': 'application/x-www-form-urlencoded' },
                                  data: qs.stringify(data),
                                  url: 'api/GreenCampus/alarm/delete'
                                }
                                axios(options).then(res => {
                                  this.$Message.info('删除成功')
                                  this.remove(params.index)
                                })
                            }
                        }
                    }, '删除')
                ]);
            }
        }
      ],
      data6: [],
      pageNo: 1,
      isread: 0,
      showReaded: true,
      showNotRead: false
    }
  },
  mounted () {
    this.getAlarmRecord()
  },
  methods: {
    getAlarmRecord () {
      axios.get('api/GreenCampus/alarm/allAlarmRecordByRead', {
        params: {
          isread: this.isread,
          pageNo: this.pageNo,
          pageSize: 8
        }
      }).then(res => {
        this.data6 = res.data.detail
      })
    },
    handleNoRead () {
      this.showReaded = true
      this.showNotRead = false
      this.isread = 0
      this.getAlarmRecord()
    },
    handleReaded () {
      this.showNotRead = true
      this.showReaded= false
      this.isread = 1
      this.getAlarmRecord()
    },
    handleNextPage () {
      this.getAlarmRecord()
      
        this.pageNo++
      
    },
    handleBeforePage () {
      if(this.pageNo == 1) {
        return
      } else {
        this.pageNo--
        this.getAlarmRecord()
      }
    },
    show (index) {
        this.$Modal.info({
            title: '告警内容',
            content: `告警内容${this.data6[index].alarmContent}`
        })
    },
    remove (index) {
        this.data6.splice(index, 1);
    }
  }
}
</script>

<style scoped>
  .alarmHeader{
    width: 100%;
    height: 30px;
    background-color: #f8f8f8;
    margin-bottom: 5px;
    padding-left: 10px;
  }
  .alarmRecord h3{
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .page{
    width: 100%;
    margin-top: 5px;
    padding-left: 5px;
  }
  .page span{
    font-size: 16px;
  }
</style>