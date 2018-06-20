const app = getApp();
import { weiboData } from './data.js';
let wxparse = require("../../wxParse/wxParse.js");
Page({
  data: {
    discussList: []
  },
  onLoad: function (options) {
    this.setData({
      discussList: weiboData.data.cards[0].card_group
    });
    wx.setNavigationBarTitle({
      title: options.id
    });
    console.log(this.data.discussList);
    wxparse.wxParse('dkcontent', 'html', this.data.dkcontent, this, 5);  
  },
  jumpTo: function (e) {
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
});