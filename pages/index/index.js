const request = require('../../tools/request')

Page({
  data: {
    bannerList: [],
    buyList: [],
    discountList: [],
    goodsTypeList: []
  },

  onLoad() {
    this.getBannerList()
    this.getBuyList()
    this.getDiscountList()
    this.getGoodsTypeList()
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
  },

  /**
   * 获取优惠活动列表
   */
  getDiscountList() {
    request
      .post('tz/notice/list', {
        pageSize: 5
      })
      .then((data) => {
        this.setData({
          discountList: data.dataList.filter((item) => item.isShow) // 筛选出要展示的
        })
      })
  },

  /**
   * 获取服装类型
   */
  getGoodsTypeList() {
    request.get('tz/shop/goods/category/all').then((data) => {
      this.setData({
        goodsTypeList: data
      })
    })
  }
})
