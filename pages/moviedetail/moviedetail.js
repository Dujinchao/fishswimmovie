// pages/moviedetail/moviedetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info:null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取热映电影
        wx.request({
            url: 'http://121.4.83.144:3600/movie/detail?movieId='+options.id+'&optimus_uuid='+app.globalData.iuuid,
            method: 'GET',
            success: (res) => {
                this.setData({
                    info:res.data.detailMovie
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})