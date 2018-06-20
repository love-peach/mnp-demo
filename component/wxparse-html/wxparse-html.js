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
      if (blogData.pics) {
        const blogOriginImgListHtml= this.renderImgListHtml(blogData.pics);
        WxParse.wxParse('blogOriginPics', 'html', blogOriginImgListHtml, this, 5);
      }
    }

    if (blogData.retweeted_status) {
      WxParse.wxParse('blogRetweet', 'html', blogData.retweeted_status.text, this, 5);
      if (blogData.retweeted_status.pics) {
        const blogRetweetImgListHtml = this.renderImgListHtml(blogData.retweeted_status.pics);
        WxParse.wxParse('blogRetweetPics', 'html', blogRetweetImgListHtml, this, 5);
      }
    }
  },
  methods: {
    wxParseTagATap: function(e) {
      var srcOg = e.currentTarget.dataset.src;
      var patt = /^\/n\//;
      if (patt.test(srcOg)) {
        srcOg = 'https://m.weibo.cn' + srcOg;
      }
      var srcNew = srcOg.replace(/\?/ig, '&');
      wx.navigateTo({
        url: `/pages/web-view/web-view?url=${srcNew}`
      });
    },
    renderImgListHtml: function(imgList) {
      let imgHtmlStr = '';
      const wrapPrefix = `<div class="img-list-wrap">`;
      const wrapSuffix = `</div>`;
      let imgHtmlArr = [];
      imgList.forEach((item) => {
        let tempHtml = `<div class="img-list-item"><div class="item-img-wrap"><div class="item-img" style="background-image: url(${item.url})"><img class="img-self" src="${item.large.url}" url="true" ></div></div></div>`;
        imgHtmlArr.push(tempHtml);
      });
      imgHtmlStr = wrapPrefix + imgHtmlArr.join('') + wrapSuffix;
      return imgHtmlStr;

    }
  }
})