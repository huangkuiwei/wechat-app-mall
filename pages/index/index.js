const request = require('../../tools/request')

Page({
  data: {
    bannerList: [],
    buyList: [],
    discountList: [],
    goodsTypeList: [],
    seckillGoodsList: [],
    hotShopList: [],
    kanjiaShopList: []
  },

  onLoad() {
    this.getBannerList()
    this.getBuyList()
    this.getDiscountList()
    this.getGoodsTypeList()
    this.getSeckillGoodsList()
    this.getHotShopList()
    this.getKanjiaShopList()
  },

  /**
   * 获取 banner 轮播图数据
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
   * 获取商品类型
   */
  getGoodsTypeList() {
    request.get('tz/shop/goods/category/all').then((data) => {
      this.setData({
        goodsTypeList: data
      })
    })
  },

  /**
   * 获取秒杀商品列表
   */
  getSeckillGoodsList() {
    request
      .post('tz/shop/goods/list', {
        miaosha: true
      })
      .then((data) => {
        // 处理数据
        data.forEach((item) => {
          // 添加倒计时数据用于页面显示
          item.countDownTime = new Date(item.dateEnd) - new Date(item.dateStart)
        })

        this.setData({
          seckillGoodsList: data
        })
      })
  },

  /**
   * 获取爆品商品列表
   */
  getHotShopList() {
    request
      .get('tz/shop/goods/list', {
        recommendStatus: 1
      })
      .then((data) => {
        this.setData({
          hotShopList: data
        })
      })
  },

  getKanjiaShopList() {
    request
      .post('tz/shop/goods/list', {
        kanjia: true
      })
      .then((data) => {
        // 获取
        const promiseList = data.map((item) => {
          return request.get('tz/shop/goods/kanjia/set/v2', {
            goodsId: item.id
          })
        })

        Promise.all(promiseList).then((dataList) => {
          dataList.forEach((item, index) => {
            data[index].process = item[0]
          })
        })

        this.setData({
          kanjiaShopList: data
        })
      })
  }
})
