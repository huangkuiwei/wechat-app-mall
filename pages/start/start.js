// 导入 reuqest.js，require只支持相对路径
const request = require('../../tools/request')

Page({
  data: {
    bannerList: []
  },

  onLoad() {
    // 是否已经展示过首页的轮播图
    const hasShowStartImg = wx.getStorageSync('hasShowStartImg')

    // 没有展示过的情况下才去请求轮播图数据
    if (!hasShowStartImg) {
      // 请求轮播图
      request
        .get('tz/banner/list', {
          type: 'app'
        })
        .then((data) => {
          this.setData({
            bannerList: data
          })
        })
    } else {
      // TODO 跳转到 index 首页
    }
  }
})
