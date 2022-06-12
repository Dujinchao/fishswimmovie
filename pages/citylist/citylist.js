const app = getApp()
// pages/city-list/citylist.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        cityListData:null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
          url: 'http://121.4.83.144:3600/city',
          method:'GET',
          success:res=>{
                this.setData({
                    cityListData:res.data.cts
                })
          }
        })
    },
    bindChangeCity:function(e){
        app.globalData.addressInfo.id = e.currentTarget.dataset.info.id;
        app.globalData.addressInfo.nm = e.currentTarget.dataset.info.nm;
        console.log('citylist ',app.globalData.addressInfo);
        wx.switchTab({
          url: '../index/index',
        })
    }
})