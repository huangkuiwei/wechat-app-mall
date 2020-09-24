const request = require('../../tools/request')

Page({
  data: {
    bannerList: [],
    buyList: []
  },

  onLoad() {
    this.getBannerList()
    this.getBuyList()
  },

  /**
   * 获取轮播图数据
   */
  getBannerList() {
    request
      .get('tz/banner/list', {
        type: 'index'
      })
      .then((data) => {
        this.setData({
          bannerList: data
        })
      })
  },

  /**
   * 获取购买记录滚动条记录
   */
  getBuyList() {
    request
      .get('tz/site/goods/dynamic', {
        type: 0
      })
      .then((data) => {
        this.setData({
          buyList: data
        })
      })
  }
})
