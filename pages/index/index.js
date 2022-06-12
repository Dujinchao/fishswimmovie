const app = getApp();
// pages/index/index.js
Page({
    data: { // 状态栏上方空白
        navigationBarTop: wx.getStorageSync('navigationBarTop'),
        // 导航栏高度
        navigationBarHeight: wx.getStorageSync('navigationBarHeight'),
        navbar: ['正在热映', '影院', '即将上映'],
        currentTab: 0,
        bannerData: [{
                imgSrc: "/static/images/swiper/swiper-1.png"
            },
            {
                imgSrc: "/static/images/swiper/swiper-2.png"
            },
            {
                imgSrc: "/static/images/swiper/swiper-3.png"
            },
            {
                imgSrc: "/static/images/swiper/swiper-4.png"
            }
        ],
        movieList: [{
            "id": 1298542,
            "haspromotionTag": false,
            "img": "http://p0.meituan.net/170.230/movie/cba20984e8e4423598913077e515b6121686728.jpg",
            "version": "v3d imax",
            "nm": "白蛇2：青蛇劫起",
            "preShow": false,
            "sc": 2,
            "globalReleased": true,
            "wish": 339059,
            "star": "唐小喜,张福正,魏超",
            "rt": "2021-07-23",
            "showInfo": "今天17家影院放映250场",
            "showst": 3,
            "wishst": 0,
            "showStateButton": {
                color: "#EB3855",
                content: "购票",
                onlyPreShow: false,
                shadowColor: "rgba(240,61,55,0.15)"
            }
        }],
        comingMovieList: [{
            "id": 1298542,
            "haspromotionTag": false,
            "img": "http://p0.meituan.net/170.230/movie/cba20984e8e4423598913077e515b6121686728.jpg",
            "version": "v3d imax",
            "nm": "白蛇2：青蛇劫起",
            "preShow": false,
            "sc": 0,
            "globalReleased": true,
            "wish": 339059,
            "star": "唐小喜,张福正,魏超",
            "rt": "2021-07-23",
            "showInfo": "今天17家影院放映250场",
            "showst": 3,
            "wishst": 0,
            "showStateButton": {
                color: "#3c9fe6",
                content: "预售",
                onlyPreShow: false,
                shadowColor: "rgba(240,61,55,0.15)"
            }
        }],
        cinemaListData:[],
        districtListData:[],
        brandListData:[],
        addressInfo:null,
        iuuid:null,
        today:null
    },
    // 跳转到选择城市页面
    bindToCityList:function(){
        wx.navigateTo({
          url: '../citylist/citylist',
        })
    },
    // 改变顶部导航
    changeNavBar: function (e) {
        this.setData({
            currentTab: e.currentTarget.dataset.tab_index
        })
    },
    initData:function(){
        let myTime = new Date();
        let Year = myTime.getFullYear();
        let Month = myTime.getMonth() + 1;
        let myDate = myTime.getDate();
        if (Month < 10) Month = '0' + Month;
        let today = Year + '-' + Month + '-' + myDate;
        // 设置初始属性
        this.setData({
            addressInfo:app.globalData.addressInfo,
            iuuid:app.globalData.iuuid,
            today:today
        })
        // 获取热映电影
        wx.request({
            url: 'http://121.4.83.144:3600/movie/hot?ci=20&optimus_uuid='+this.data.iuuid,
            method: 'GET',
            success: (res) => {
                this.setData({
                    movieList:res.data.movieList
                })
            }
        });
        // 获取即将上映电影
        wx.request({
          url: 'http://121.4.83.144:3600/movie/coming?ci='+this.data.addressInfo.id+'&limit=10&optimus_uuid='+this.data.iuuid,
          method:'GET',
          success:res=>{
              this.setData({
                comingMovieList:res.data.coming
              })
          }
        })
        //获取影院分类信息
        wx.request({
            url: 'http://121.4.83.144:3600/cinema/filter?ci='+this.data.addressInfo.id+'&optimus_uuid='+this.data.iuuid,
            method: 'GET',
            success:res=>{
                this.setData({
                    districtListData:res.data.district.subItems,
                    brandListData:res.data.brand.subItems,
                })
            }
        })
        //获取影院列表信息
        wx.request({
            url: 'http://121.4.83.144:3600/cinema?day='+this.data.today+'&limit=10&offset=0&districtId=-1&areaId=-1&hallType=-1&brandId=-1&serviceId=-1&lineId=-1&stationId=-1&reqId=1579328443243&cityId='+this.data.addressInfo.id+'&optimus_uuid='+app.globalData.iuuid,
            method: 'GET',
            success:res=>{
                this.setData({
                    cinemaListData:res.data.cinemas,
                })
            }
        })
    },
    onLoad() {
        // 获取状态栏高度
        const {
            statusBarHeight,
        } = wx.getSystemInfoSync()
        //获取胶囊信息
        const {
            top,
            height
        } = wx.getMenuButtonBoundingClientRect()
        // 自定义导航栏的到顶部距离 = 状态栏高度
        wx.setStorageSync('navigationBarTop', statusBarHeight)
        // 自定义导航栏高度 = 胶囊高度 + 胶囊的padding*2。如果获取不到设置为38
        wx.setStorageSync('navigationBarHeight', height ? height + (top - statusBarHeight) * 2 : 38)
        this.initData()
    },
    onShow(){
        // console.log(app.globalData.addressInfo);
        // console.log(this.data.addressInfo.nm);
        // console.log(app.globalData.addressInfo.id,this.data.addressInfo.id);
        // if(app.globalData.addressInfo.id !== this.data.addressInfo.id){
        // }
    }
})