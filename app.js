App({
  onLaunch() {
    this.onNetworkType()
    this.checkNewVerison()
  },

  /**
   * 监听网络变化
   */
  onNetworkType() {
    // 初始化时先获取到当前的网络状态
    wx.getNetworkType({
      success: (res) => {
        if (res.networkType === 'none') {
          this.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })

    // 监听网络变化
    wx.onNetworkStatusChange((res) => {
      if (!res.isConnected) {
        this.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000
        })
      } else {
        this.globalData.isConnected = true
        wx.hideToast()
      }
    })
  },

  /**
   * 检测新版本
   */
  checkNewVerison() {
    const updateManager = wx.getUpdateManager()

    updateManager.onUpdateReady(() => {
      // 更新提示
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  },

  // 全局数据
  globalData: {
    isConnected: true // 是否连接到网络
  }
})
