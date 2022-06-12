// pages/index/components/cinema/cinema.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cinemaListData: Array,
        districtListData: Array,
        brandListData: Array,
        addressInfo:Object,
        iuuid:String,
        today:String
    },

    /**
     * 组件的初始数据
     */
    data: {
        selectShow: false,
        selectType: 'none',
        district: {
            id: -1,
            name: '全城'
        },
        brand: {
            id: -1,
            name: '全部'
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 展开城市列表
        bindShowDistrictList(e) {
            if (this.data.selectType === 'none') {
                this.setData({
                    selectShow: true,
                    selectType: 'district'
                })
            } else if (this.data.selectType === 'district') {
                this.setData({
                    selectShow: false,
                    selectType: 'none'
                })
            } else if (this.data.selectType === 'cinema') {
                this.setData({
                    selectType: 'district'
                })
            }
        },
        // 改变区县
        bindChangeDistrict(e) {
            this.setData({
                selectShow: false,
                selectType: 'none',
                district: e.currentTarget.dataset.item
            })
            this.resetCinemaList(this.data.district.id,this.data.brand.id)
        },
        // 展开影院列表
        bindShowCinemaList() {
            if (this.data.selectType === 'none') {
                this.setData({
                    selectShow: true,
                    selectType: 'cinema'
                })
            } else if (this.data.selectType === 'cinema') {
                this.setData({
                    selectShow: false,
                    selectType: 'none'
                })
            } else if (this.data.selectType === 'district') {
                this.setData({
                    selectType: 'cinema'
                })
            }
        },
        // 改变品牌
        bindChangeBrand(e) {
            this.setData({
                selectShow: false,
                selectType: 'none',
                brand: e.currentTarget.dataset.item
            })
            this.resetCinemaList(this.data.district.id,this.data.brand.id)
        },
        // 重新加载影院列表
        resetCinemaList(districtid, brandid) {
            brandid = brandid?brandid:-1;
            //获取影院列表信息
            wx.request({
                url: 'http://121.4.83.144:3600/cinema?day='+this.data.today+'&limit=10&offset=0&district=-1&areaId=-1&hallType=-1&brandId=' + brandid + '&serviceId=-1&lineId=-1&stationId=-1&reqId=1579328443243&cityId='+this.data.addressInfo.id+'&districtId=' + districtid + '&optimus_uuid=' + this.data.iuuid,
                method: 'GET',
                success: res => {
                    this.setData({
                        cinemaListData: res.data.cinemas,
                    })
                }
            })
        }
    }
})