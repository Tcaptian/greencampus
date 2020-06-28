<template>
  <div>
      <Table border :columns="columns7" :data="data6"></Table>
      <div class="operaAlarm">
        <Button type="primary" @click="handleAddAlarm()">添加告警</Button>
        <Modal
          v-model="modal1"
          title="添加告警"
          @on-ok="ok"
          @on-cancel="cancel">
            <Form ref="formDynamic" :model="formValidate" :label-width="80" style="width: 300px">
              <FormItem 
                label="用户名称" 
                prop="name"
              >
                  <Input v-model="formValidate.userName" placeholder="请输入用户名"></Input>
              </FormItem>
              <FormItem 
                label="告警名称" 
                prop="name"
              >
                  <Input v-model="formValidate.alarmName" placeholder="请输入告警名称"></Input>
              </FormItem>
              <FormItem
                label="告警类型"
              >
                  <CheckboxGroup v-model="alarmType">
                      <Checkbox label="能耗告警"></Checkbox>
                      <Checkbox label="用户告警"></Checkbox>
                      <Checkbox label="设备告警"></Checkbox>
                      <Checkbox label="通信告警"></Checkbox>
                  </CheckboxGroup>
              </FormItem>
            </Form>
            <button></button>
        </Modal>
        <Modal
          v-model="modal2"
          title="修改告警信息"
          @on-ok="modify"
          @on-cancel="cancel">
            <Form ref="formDynamic" :model="formValidate" :label-width="80" style="width: 300px">
              <FormItem 
                label="告警名称" 
              >
                  <Input v-model="formValidate.alarmName" placeholder="请输入告警名称"></Input>
              </FormItem>
              <FormItem
                label="告警类型"
              >
                  <CheckboxGroup v-model="alarmType">
                      <Checkbox label="能耗告警"></Checkbox>
                      <Checkbox label="用户告警"></Checkbox>
                      <Checkbox label="设备告警"></Checkbox>
                      <Checkbox label="通信告警"></Checkbox>
                  </CheckboxGroup>
              </FormItem>
            </Form>
        </Modal>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'roleAlarm',
  data () {
    return {
      modal1: false,
      modal2: false,
      alarmUserId: -2,
      alarmId: -2,
      alarmType: [],
      index: 1,
      formValidate: {
        userName: '',
        alarmName: '',
      },
      columns7: [
          {
              title: '告警名称',
              key: 'alarmName'
          },
          {
              title: '告警类型',
              key: 'alarmType'
          },
          {
              title: '告警方式',
              key : 'alarmWay'
          },
          {
              title: '告警用户',
              key : ''
          },
          {
              title: 'Action',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px',
                          },
                          on: {
                              click: () => {
                                  this.modal2 = true
                                  this.formValidate.alarmName = params.row.alarmName
                                  this.alarmUserId = params.row.alarmUserId
                                  this.alarmId = params.row.alarmId
                                  let a = params.row.alarmType.split(',')
                                  
                                  this.alarmType = a
                
                              }
                          }
                      }, '更新'),
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
                                    this.getAllAlarm()
                                  }).catch(error => {
                                    alert('您的权限不够')
                                  })
                              }
                          }
                      }, '删除')
                  ]);
              }
          }
      ],
      data6: []
    }
  },
  mounted () {
    this.getAllAlarm()
  },
  methods: {

    getAllAlarm () {
      axios.get('api/GreenCampus/alarm/allAlarm').then(res => {
        this.data6 = res.data.detail
        this.data6.forEach(item => {
          item.alarmWay = "邮件"
        })
        return res.data.detail
      }).then(res => {
        res.forEach(item => {
          axios.get('api/GreenCampus/user/one', {
            params: {
              userId: item.alarmUserId
            }
          })
        })
        
      })
    },
    handleAddAlarm () {
      this.modal1 = true
      this.alarmType = []
      this.formValidate.alarmName = ''
    },
    remove (index) {
        this.data6.splice(index, 1);
    },
    ok () {
      axios.get('api/GreenCampus/user/search', {
        params:{
          name: this.formValidate.userName
        }
      }).then(res => {
        let id = -2
        res.data.detail.forEach(item => {
          id = item.userId
        })
        const data = {
          alarmUserId: id,
          alarmName: this.formValidate.alarmName,
          alarmType: this.alarmType
        }
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
          url: 'api/GreenCampus/alarm/add'
        }
        axios(options).then(res => {
          this.getAllAlarm()
          this.$Message.info('添加成功');
        }).catch(error => {
        alert('您的权限不够')
      })
      })
      
    },
    modify () {
      if(this.formValidate.alarmName == '' & this.alarmType == '') {
        return
      }
      const data = {
        alarmId: this.alarmId,
        alarmUserId: this.alarmUserId,
        alarmName: this.formValidate.alarmName,
        alarmType: this.alarmType
      }
      const options = {
          method: 'PUT',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
          url: 'api/GreenCampus/alarm/updateAlarm'
        }
      axios(options).then(res => {
        this.getAllAlarm()
      }).catch(error => {
        alert('您的权限不够')
      })
    },
    cancel () {
      this.$Message.info('已取消 ');
    }
  }
}
</script>

<style scoped>
  .alarmMesage li{
    height: 50px;
    line-height: 50px;
  }
  .alarmMesage input{
    width: 250px;
    height: 32px;
    box-sizing:border-box;
    background:none;  
    outline:none;  
    border:none;
    border: 1px #e9ebed solid;
    border-radius: 5px;
    margin-right: 20px;
    padding-left: 20px;
    cursor:pointer;
  }
  .alarmMesage input:hover{
    border: 1px #b9d6f8 solid;
  }
</style>