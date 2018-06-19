//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    listData: [
      { "name": "BTC", "new": "16850.00", "change": "3.03%", "changeWeek": "1%" },
      { "name": "BTC", "new": "6850.00", "change": "3.03%", "changeWeek": "0%" },
      { "name": "BTC", "new": "850.00", "change": "3.03%", "changeWeek": "12.98%" },
      { "name": "BTC", "new": "50.00", "change": "30.03%", "changeWeek": "20%" },
      { "name": "BTC", "new": "0.01", "change": "3.03%", "changeWeek": "90.90%" },
      { "name": "BTC", "new": "6850.00", "change": "103.03%", "changeWeek": "88.92%" },
      { "name": "BTC", "new": "6850.00", "change": "0.03%", "changeWeek": "23.90%" },
      { "name": "BTC", "new": "16850.00", "change": "3.03%", "changeWeek": "1%" },
      { "name": "BTC", "new": "6850.00", "change": "3.03%", "changeWeek": "0%" },
      { "name": "BTC", "new": "850.00", "change": "3.03%", "changeWeek": "12.98%" },
      { "name": "BTC", "new": "50.00", "change": "30.03%", "changeWeek": "20%" },
      { "name": "BTC", "new": "0.01", "change": "3.03%", "changeWeek": "90.90%" },
      { "name": "BTC", "new": "6850.00", "change": "103.03%", "changeWeek": "88.92%" },
      { "name": "BTC", "new": "6850.00", "change": "0.03%", "changeWeek": "23.90%" },
      { "name": "BTC", "new": "16850.00", "change": "3.03%", "changeWeek": "1%" },
      { "name": "BTC", "new": "6850.00", "change": "3.03%", "changeWeek": "0%" },
      { "name": "BTC", "new": "850.00", "change": "3.03%", "changeWeek": "12.98%" },
      { "name": "BTC", "new": "50.00", "change": "30.03%", "changeWeek": "20%" },
      { "name": "BTC", "new": "0.01", "change": "3.03%", "changeWeek": "90.90%" },
      { "name": "BTC", "new": "6850.00", "change": "103.03%", "changeWeek": "88.92%" },
      { "name": "BTC", "new": "6850.00", "change": "0.03%", "changeWeek": "23.90%" }
    ]
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
