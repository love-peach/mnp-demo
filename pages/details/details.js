const app = getApp();

import { weiboData } from './data.js';
let wxparse = require("../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    discussList: [],
    searchWord: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      discussList: weiboData.data.cards[0].card_group
    });
    wx.setNavigationBarTitle({
      title: options.searchWord
    });
    this.setData({
      searchWord: options.searchWord
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '币发-详情',
      // desc: '让你比别人多赚点',
      path: '/pages/details/details?searchWord=' + this.data.searchWord
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
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

  /**
   * 跳转到web-view
   */
  jumpTo(e) {
    var srcOg = e.currentTarget.dataset.src;
    var patt = /^\/n\//;
    if (patt.test(srcOg)) {
      srcOg = 'https://m.weibo.cn' + srcOg;
    }
    var srcNew = srcOg.replace(/\?/ig, '&');
    console.log(srcNew, 'srcNew')
    wx.navigateTo({
      url: `/pages/web-view/web-view?url=${srcNew}`
    });
  },
});