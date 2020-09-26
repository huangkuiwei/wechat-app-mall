// 请求接口基础路径
const BASE_URL = 'https://api.it120.cc/'

/**
 * 微信 http 请求二次封装，返回 Promise
 * @param {请求方法} method
 * @param {请求地址} url
 * @param {发送数据} data
 * @param {其它请求参数} options
 */
function request(method, url, data, options = { header: {} }) {
  // 请求地址
  url = BASE_URL + url

  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url,
      data,
      ...options,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        ...options.header
      },
      success: (result) => {
        // result.data.code === 0 时，返回的数据为预期数据
        if (result.data.code === 0) {
          resolve(result.data.data)
        } else {
          reject(result)
        }
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

/**
 * GET 请求
 * @param {请求地址} url
 * @param {发送数据} data
 * @param {其它请求参数} options
 */
function get(url, data, options) {
  return request('GET', url, data, options)
}

/**
 * POST 请求
 * @param {请求地址} url
 * @param {发送数据} data
 * @param {其它请求参数} options
 */
function post(url, data, options) {
  return request('POST', url, data, options)
}

module.exports = {
  get,
  post
}
