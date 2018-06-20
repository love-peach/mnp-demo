//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    listData: [
      { "name": "TRUE", "new": "16850.00", "change": "3.03%", "changeWeek": "1%" },
      { "name": "BTC", "new": "6850.00", "change": "3.03%", "changeWeek": "0%" },
      { "name": "BTC", "new": "850.00", "change": "3.03%", "changeWeek": "12.98%" },
      { "name": "BTC", "new": "50.00", "change": "30.03%", "changeWeek": "20%" },
      { "name": "BTC", "new": "0.01", "change": "3.03%", "changeWeek": "90.90%" },
      
    ]
  },
  onShareAppMessage: function (res) {
    console.log(res, 'res');
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '币发-行情',
      // desc: '让你比别人多赚点',
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh: function() {
    setTimeout(function() {
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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
});
