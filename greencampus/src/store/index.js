import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    details: [],
    regionChildId: 0,
    regionModifyId: 0,
    areaConsume:[],
    regionInfo: {},
    deviceInfo: []
  },
  actions: {
    getDetails(ctx, details) {
      ctx.commit('getDetails', details)
    },
    getChildRegionId (ctx, id) {
      ctx.commit('getChildRegionId', id)
    },
    getModifyId (ctx, id) {
      ctx.commit('getModifyId', id)
    },
    getAreaConsume (ctx, data) {
      ctx.commit('getAreaConsume', data)
    },
    getRegionInfo(ctx, regionInfo) {
      ctx.commit('getRegionInfo', regionInfo)
    },
    getDeviceInfo(ctx, deviceInfo) {
      ctx.commit('getDeviceInfo', deviceInfo)
    }
  },
  mutations: {
    getDetails (state, details) {
      state.details = details
    },
    getChildRegionId (state, id) {
      state.regionChildId = id
    },
    getModifyId (state, id) {
      state.regionModifyId = id
    },
    getAreaConsume (state, data) {
    state.areaConsume = data
    },
    getRegionInfo(state, regionInfo) {
      state.regionInfo = regionInfo
    },
    getDeviceInfo(state, deviceInfo) {
      state.deviceInfo = deviceInfo
    }
  }
})