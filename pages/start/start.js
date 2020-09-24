// 导入 reuqest.js，require只支持相对路径
const request = require('../../tools/request')

Page({
  data: {
    bannerList: [] // banner 图片列表
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
      this.jumpIndex()
    }
  },

  /**
   * 点击 banner 图片
   * @param {事件对象} event
   */
  tapBanner(event) {
    // 通过 dataset 获取当前 banner 图片的下标
    const index = event.target.dataset.index

    if (index === this.data.bannerList.length - 1) {
      // 最后一张 banner 图片，跳转到 index
      this.jumpIndex()
    } else {
      // 其它图片给予提示
      wx.showToast({
        title: '左滑进入',
        icon: 'none'
      })
    }
  },

  /**
   * 跳转到 index 页面
   */
  jumpIndex() {
    // 设置状态
    wx.setStorageSync('hasShowStartImg', true)

    // 页面跳转，wx.switchTab 只能跳转发哦 tab 页面
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
