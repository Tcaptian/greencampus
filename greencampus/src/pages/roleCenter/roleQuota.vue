<template>
<div class="roleQuota">
  <Table border :columns="columns7" :data="data6"></Table>
  <Button type="info" @click="handleAddQuota()">新建指标</Button>
  <Modal
    v-model="modal1"
    title="更新指标内容"
    @on-ok="modify"
    @on-cancel="cancel">
    <Form :model="updateItem" :label-width="100">
      <FormItem label="能耗类型">
          <Input v-model="updateItem.batteryType" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="指标限值">
          <Input v-model="updateItem.quotaLimit" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="单位">
          <Input v-model="updateItem.batteryUnit" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="指标限值类型">
          <Input v-model="updateItem.quotaLimitType" placeholder="Enter something..."></Input>
      </FormItem>
    </Form>
  </Modal>
  <Modal
    v-model="modal2"
    title="新建指标内容"
    @on-ok="modify"
    @on-cancel="cancel">
    <Form :model="updateItem" :label-width="100">
      <FormItem label="能耗类型">
          <Input v-model="updateItem.batteryType" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="指标限值">
          <Input v-model="updateItem.quotaLimit" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="单位">
          <Input v-model="updateItem.batteryUnit" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem label="指标限值类型">
          <Input v-model="updateItem.quotaLimitType" placeholder="Enter something..."></Input>
      </FormItem>
    </Form>
  </Modal>
</div>
    
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      modal1: false,
      modal2: false,
      updateItem: {
        batteryType: '',
        quotaLimit: '',
        batteryUnit: '',
        quotaLimitType: '',
        quotaId: -2,
        regionId: -2
      },
      columns7: [
        {
          title: '指标名称',
          key: 'quotaName',
        },
        {
          title: '指标类型',
          key: 'quotaType'
        },
        {
          title: '能耗类型',
          key: 'batteryType'
        },
        {
          title: '指标限值',
          key: 'quotaLimit'
        },
        {
          title: '单位',
          key: 'batteryUnit'
        },
        {
          title: '指标限值类型',
          key: 'quotaLimitType'
        },
        {
          title: '操作',
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
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modal1 = true
                    this.updateItem.quotaId = params.row.quotaId,
                    this.updateItem.regionId = params.row.regionId
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
                      alarmId: params.row.quotaId
                    }
                    const options = {
                      method: 'DELETE',
                      headers: { 'content-type': 'application/x-www-form-urlencoded' },
                      data: qs.stringify(data),
                      url: 'api/GreenCampus/quota/delete'
                    }
                    axios(options).then(res => {
                      this.getAllQuota()
                      this.remove(params.index)
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
    this.getAllQuota()
  },
  methods: {
    remove (index) {
      this.data6.splice(index, 1);
    },
    getAllQuota () {
      axios.get('api/GreenCampus/quota/allStandradQuota', {
        params: {
          pageNo: 1,
          pageSize: 10
        }
      }).then(res => {
        this.data6 = res.data.detail
      })
    },
    handleAddQuota () {
      this.modal2 = true
    },
    modify () {
      if(this.updateItem.quotaLimit == '' && this.updateItem.batteryType == '' && this.updateItem.batteryUnit == '' && this.updateItem.quotaLimitType == '') {
        return
      }
      const data = {
        batteryType: this.updateItem.batteryType,
        quotaLimit: Number(this.updateItem.quotaLimit),
        batteryUnit: this.updateItem.batteryUnit,
        quotaLimitType: this.updateItem.quotaLimitType,
        quotaId: this.updateItem.quotaId,
        regionId: this.updateItem.regionId
      }
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/quota/update'
      }
      axios(options).then(res => {
        this.getAllQuota()
        this.$Message.info('添加成功')
      }).catch(error => {
          alert('您的权限不够')
      })
    },
    cancel() {
      this.$Message.info("已取消")
    },
  }
}
</script>

<style scoped>
  
  
</style>