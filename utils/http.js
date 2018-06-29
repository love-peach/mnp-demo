
export default {
  get: (url, obj = undefined) => {
    var promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          // 'mid': mid,
          // 'token': token
        },
        data: obj,
        success: (data) => {
          if (data.data.code == 200) {
            resolve(data.data)
          } else {
            console.log('前端故障');
            reject(data.errMsg)
          }
        },
        fail: (msg) => {
          console.log('后端故障')
          reject(msg.errMsg)
        },
        complete: () => {
          // 不管成功或失败 执行的事情
          // wx.hideLoading();
        }
      })
    })
    return promise;
  },
  post: (url, obj) => {
    var promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          // 'mid': mid,
          // 'token': token
        },
        data: obj,
        success: (data) => {
          if (data.data.code == 200) {
            resolve(data.data)
          } else {
            console.log('前端故障');
            reject(data.errMsg)
          }
        },
        fail: (msg) => {
          console.log('后端故障')
          reject(data.errMsg)
        }
      })
    })
    return promise;
  }
}