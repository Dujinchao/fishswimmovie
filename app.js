// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // this.globalData.iuuid = '0EBC6C50362911EA9BE0C38C17C05E2EEA46F45F99614B618B06BBA29C86C236'
    wx.request({
      url: 'http://m.maoyan.com',
      method:'GET',
      success:res=>{
        console.log(res.cookies);
        this.globalData.iuuid = res.cookies[5]?res.cookies[5]:'0EBC6C50362911EA9BE0C38C17C05E2EEA46F45F99614B618B06BBA29C86C236'
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync('key', res.code)
      }
    })
  },
  globalData: {
    userInfo: null,
    addressInfo: {
      nm: '青岛',
      id: 60
    },
    iuuid:null
  }
})