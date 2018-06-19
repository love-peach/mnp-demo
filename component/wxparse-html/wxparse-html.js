let WxParse = require("../../wxParse/wxParse.js");
Component({
  properties: {
    blogData: Object
  },
  ready: function() {
    const that = this;
    const { blogData } = this.properties;
    if (blogData.text) {
      WxParse.wxParse('blogOrigin', 'html', blogData.text, this, 5)
    }

    if (blogData.retweeted_status) {
      WxParse.wxParse('blogRetweet', 'html', blogData.retweeted_status.text, this, 5)
      // if (blogData.retweeted_status.pics) {
      //   const imgArray = blogData.retweeted_status.pics.map(item => item.large.url);
      //   console.log(imgArray, 'imgArray');
      //   wx.previewImage({
      //     current: '', // 当前显示图片的http链接
      //     urls: imgArray // 需要预览的图片http链接列表
      //   })
      // }
    }
  },
  methods: {}
})