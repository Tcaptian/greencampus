<template>
  <div class="findPassword">
    <div class="header">
      <div class="header-left">
        <span>找回密码</span>
      </div>
      <div class="header-right">
        <span>反馈问题</span>
        <router-link to="/">
          <span>返回首页</span>
        </router-link>
        
      </div>
    </div>
    <div class="step">
      <Steps :current="current">
        <Step title="填写账号" content="输入账号"></Step>
        <Step title="设置密码" content="设置新密码"></Step>
        <Step title="完成" content="修改完成"></Step>
      </Steps>
    </div>
    <div class="content">
      <Form v-if="firstStep">
        <FormItem  label="账号：">
            <Input type="text" v-model="userName" placeholder="Username" >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <Button type="info" @click="handleNext()">下一步</Button>
      </Form>
      <Form v-if="secondStep">
        <FormItem  label="密码:" >
            <Input type="password" v-model="password" placeholder="Username" >
                 <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <Button type="info" @click="handleSubmit()">确认</Button>
      </Form>
      <div v-if="success" class="success">
        <img src="@/assets/img/modifypassword.png" alt="">
        <Button type="info" to="/login">返回</Button>
      </div>
      
    </div>
    <div class="footer">
      <p>公司地址：陕西省西安市临潼区斜口街道西安科技大学临潼校区 联系电话：80-800-8800</p>
      <p>绿色校园能耗管理系统  版权所有 。。。  技术支持：西安科技大学 毕设系统</p>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'findPassword',
  data () {
    return {
        userName: '',
        password: '',
        current: 0,
        firstStep: true,
        secondStep: false,
        success: false
        
    }
  },
  methods: {
    handleNext () {
      if(this.userName == '') {
        alert('请输入用户名')
        return
      }
      this.current++
      this.firstStep = false
      this.secondStep = true
    },
    handleSubmit() {
      if(this.password == '') {
        alert('请输入要修改的密码')
        return
      }
      const data = {
        userName: this.userName,
        passWord: this.password
      }
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/user/updatePassword'
      };
      axios(options).then(res => {
        this.current++
        this.secondStep = false
        this.success = true
      })
    }
  }
}
</script>

<style scoped>
  .header{
    width: 100%;
    height: 68px;
    background-color: #5aa2f7;
    display: flex;
    justify-content: space-around;
    align-items:center;
  }
  .header-left span{
    color: white;
    font-size: 22px;
  }
  .header-right span{
    color: white;
  }
  .header-right span:nth-child(1) {
    margin-right: 20px;
  }
  .header-right span:nth-child(2) {
    cursor: pointer;
  }
  .step{
    width: 50%;
    margin: 100px auto;
  }
  .content{
    width: 200px;
    margin: 0 auto;
  }
  .success{
    text-align:center;
  }
  .footer{
    width: 100%;
    padding-top: 10px;
    height: 68px;
    background-color: #ededed;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
  .footer p{
    color: #969090;
  }
</style>