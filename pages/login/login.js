// pages/login/login.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        read_status:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app);
    },
    /**
     * 协议是否已读 
     */
    bindChangeReadStatus:function(){
        this.setData({
            read_status:!this.data.read_status
        })
    },
    /**
     * 未勾选登录协议 
     */
    bindReadPromise:function(){
        wx.showToast({
            icon:'none',
            title: '请先勾选同意服务协议',
        })
    },
    /**
     * 用户登录 
     */
    bindGetUserInfo: function(){
        let that = this;
        wx.getSetting({
            success: res => {
                wx.getUserProfile({
                    desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    success: (res) => {
                        wx.showLoading({
                            title: '登录中',
                          })
                        wx.login({
                            success: loginRes => {
                                wx.hideLoading();
                                const code = loginRes.code;
                                if (code) {
                                    app.globalData.userInfo = res.userInfo;
                                    wx.switchTab({
                                      url: '../mine/mine',
                                    })
                                } else {
                                    wx.showToast({
                                        title: '获取code失败',
                                    })
                                }
                            },
                            fail:()=>{
                                wx.hideLoading();
                                wx.showToast({
                                    icon:'error',
                                    title: '登录失败',
                                })

                            }
                        })
                    }
                })
            }
        })
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