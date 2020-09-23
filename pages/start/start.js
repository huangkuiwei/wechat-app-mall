const $http = require('../../http/index')

console.log('$http', $http)

Page({
  onLoad() {
    // 是否已经展示过首页的轮播图
    const hasShowStartImg = wx.getStorageSync('hasShowStartImg')

    // 没有展示过的情况下才去请求轮播图数据
    if (!hasShowStartImg) {
      $http.get('https://api.it120.cc/tz/banner/list?type=app').then((data) => {
        console.log('data', data)
      })
    }
  }
})
