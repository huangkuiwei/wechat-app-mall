function get(url, data, options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      methods: 'Get',
      ...options,
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

function post(url, data, options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      methods: 'POST',
      ...options,
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

module.exports = {
  get,
  post
}
