const app = getApp()

Page({
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
  longpress: function(e) {
    wx.previewImage({
      urls: e.target.dataset.src.split(',')
    })
  }
});