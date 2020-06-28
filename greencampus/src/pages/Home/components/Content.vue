<template>
<div class="content">
  <div class="content-one">
    <p> 能源管控系统是一个为能源管理者和决策者提供管理和决策的技术工具，辅助以能耗监测、统计和诊断分析技术手段，找出能源浪费的薄弱环节，从而引导采取有效节能措施加以改进，其也应用于对已耗能源利用效率的评估及未来能源使用需求趋势的分析，提升学校的能源管理和决策水平</p>
    <div class="font">
      <span>一）以能耗公示服务于广大师生等能源使用者；</span>
      <span>二）是以能耗监测、能源审计、节能诊断等服务于学校后勤部门等能源管理者；</span>
      <span>三）是以定额管理、决策分析等服务于学校领导等能源决策者。</span>
    </div>
  </div>
  <div class="image">
    <img src="@/assets/img/pic1.png" alt="">
  </div>
  <div class="image-fot"></div>
</div>
</template>

<script>
export default {
  name: 'HomeContent'
}
</script>

<style scoped>
  .content{
    position:relative;
  }
  .content-one{
    width: 100%;
    height:450px;
    background:#5AD1E5;
    overflow: hidden;
    position:relative;
  }
  .content .image{
    width: 580px;
    height:369px;
    background-color:white;
    border:#ccc 1px solid;
    position: absolute;
    top: 120px;
    left: 152px;
    text-align:center;
    line-height:369px;
    border-radius:30px 30px 0px 0px;
  }
  .content .image-fot{
    width:620px;
    height:20px;
    border:#ccc 1px solid;
    border-radius:100px 109px 0px 0px;
    position:absolute;
    left:132px;
    margin-top:38px;
    box-shadow:2px 10px 12px 5px #999;
  }
  .content .content-one p{
    width: 576px;
    color:white;
    position: absolute;
    top: 100px;
    right: 50px;
    text-indent: 2rem;
  }
  .content .content-one .font{
    position:absolute;
    display: flex;
    flex-direction: column;
    top: 230px;
    right: 136px;
  }
  .content .content-one .font span{
    color:white;
  }
</style>