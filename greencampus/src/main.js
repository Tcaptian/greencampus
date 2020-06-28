// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import echarts from 'echarts'
import store from './store'
import Layout from './components/Layout'
import pieChart from './components/pieChart'
import barChart from './components/barChart'
import lineChart from './components/lineChart'
import dataQuery from './components/dataQuery'
import myTable from './components/myTable'
import './assets/styles/iconfont.css'
import './assets/styles/common.css'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.component("layout", Layout)
Vue.component('pieChart', pieChart)
Vue.component('barChart', barChart)
Vue.component('lineChart', lineChart)
Vue.component('dataQuery', dataQuery)
Vue.component('myTable', myTable)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
