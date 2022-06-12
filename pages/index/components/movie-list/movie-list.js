// pages/index/components/movie-list/movie-list.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        resData: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 跳转到电影详情页面
        bindToMovieDetail:function(e){
            const movieId=e.currentTarget.dataset.info.id;
            wx.navigateTo({
              url: '/pages/moviedetail/moviedetail?id='+movieId,
            })
        },
    }
})