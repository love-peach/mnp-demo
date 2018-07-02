const app = getApp()

Page({
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '币发-社群',
      // desc: '让你比别人多赚点',
      path: '/pages/community/community'
    }
  },

  /**
   * 图片预览
   */
  previewImg: function(e) {
    console.log(e, 'e')
    wx.previewImage({
      urls: e.target.dataset.src.split(',')
    })
    wx.getImageInfo({// 获取图片信息（此处可不要）  
      src: e.target.dataset.src,
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
      }
    })  
  },

  /**
   * 长按事件
   */
  longpress: function(e) {
    wx.previewImage({
      urls: e.target.dataset.src.split(',')
    })
  }
});