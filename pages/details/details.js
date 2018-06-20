const app = getApp();
import { weiboData } from './data.js';
let wxparse = require("../../wxParse/wxParse.js");
Page({
  data: {
    discussList: [],
    id: ''
  },
  onLoad: function (options) {
    this.setData({
      discussList: weiboData.data.cards[0].card_group
    });
    wx.setNavigationBarTitle({
      title: options.id
    });
    this.setData({
      id: options.id
    });
  },
  onShareAppMessage: function (res) {
    console.log(res, 'res');
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '币发-详情',
      // desc: '让你比别人多赚点',
      path: '/pages/details/details?id=' + this.data.id
    }
  },
  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 800)
    // wx.request({
    //   url: '',
    //   data: {},
    //   method: 'GET',
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) {
    //     wx.stopPullDownRefresh();
    //   }
    // })
  },
  onReachBottom: function () {
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    setTimeout(function () {
      wx.hideLoading();
    }, 800)
    // page = page + 1;
    // wx.request({
    //   url: 'https://xxx/?page=' + page,
    //   method: "GET",
    //   success: function (res) {
    //     wx.hideLoading();
    //   }
    // })
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