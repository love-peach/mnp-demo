const app = getApp();

import { weiboData } from './data.js';
import http from '../../utils/http.js';
import util from '../../utils/util.js';
const apiUrl = app.globalData.apiUrl;
let wxparse = require("../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    discussList: [],
    searchWord: '',
    closeToFixed: '',
    closeCnyToFixed: '',
    rateStrIsDown: '',
    rateStrFormat: '',
    symbolStr: '',
    coinId: '',
    coinData: {},
    weiboParams: {
      symbol: '',
      pageIndex: 0,
      pageCount: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options, 'options');
    wx.showLoading({
      title: '玩命加载中',
    });
    this.setData({
      searchWord: options.searchWord,
      closeToFixed: options.closeToFixed,
      closeCnyToFixed: options.closeCnyToFixed,
      rateStrIsDown: options.rateStrIsDown === 'false' ? false : true,
      rateStrFormat: options.rateStrFormat,
      symbolStr: options.symbol,
      coinId: options.coinId,
      'weiboParams.symbol': options.symbol
    });
    wx.setNavigationBarTitle({
      title: options.searchWord
    });
    this.requestCoinData();
    this.requestWeiboData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    const {
      searchWord,
      closeToFixed,
      closeCnyToFixed,
      rateStrIsDown,
      rateStrFormat,
      symbolStr,
      coinId
    } = this.data;
    return {
      title: '币发早知道',
      desc: searchWord + '实时消息讨论',
      path: `/pages/details/details?searchWord=${searchWord}&closeToFixed=${closeToFixed}&closeCnyToFixed=${closeCnyToFixed}&rateStrIsDown=${rateStrIsDown}&rateStrFormat=${rateStrFormat}&symbol=${symbolStr}&coinId=${coinId}`
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      'weiboParams.pageIndex': 0
    });
    this.requestWeiboData(null, function () {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    const { pageIndex } = this.data.weiboParams;
    this.setData({
      'weiboParams.pageIndex': pageIndex + 1
    });
    this.requestWeiboData();
  },

  /**
   * 请求币数据
   */
  requestCoinData(params, callback) {
    wx.showLoading({
      title: '玩命加载中',
    });
    const paramsObj = params ? params : {
      collectName: this.data.symbolStr
    };
    const that = this;

    http.get(apiUrl + '/b/a/coin/detail/' + that.data.coinId)
      .then(res => {
        const circulationMarketValue = res.data.countCap * that.data.closeCnyToFixed;
        const circulationMarketValueStr = that.moneyValueFormat(circulationMarketValue);

        that.setData({
          coinData: res.data,
          'coinData.countCapFormat': that.moneyValueFormat(res.data.countCap),
          'coinData.circulationMarketValue': circulationMarketValueStr
        })
        callback && callback();
        wx.hideLoading();
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err, 'err 币详情')
      })
  },

  /**
   * 以 亿 万 来格式化数字
   */
  moneyValueFormat(num) {
    const unitValueYI = num / 100000000;
    const unitValueWan = num / 10000;
    let valueStr = '';
    if (unitValueYI >= 1) {
      valueStr = util.getFloat(unitValueYI, 2) + '亿'
    } else if (unitValueWan >= 1) {
      valueStr = util.getFloat(unitValueWan, 2) + '万'
    } else {
      valueStr = util.getFloat(num, 2)
    }
    return valueStr;
  },

  /**
   * 请求微博数据
   */
  requestWeiboData(params, callback) {
    wx.showLoading({
      title: '玩命加载中',
    });
    const paramsObj = params ? params : this.data.weiboParams
    const that = this;

    http.get(apiUrl + '/b/a/sinaweibo', paramsObj)
      .then(res => {
        let weiboListData = [];
        if (paramsObj.pageIndex === 0) {
          weiboListData = [].concat(res.data.data);
        } else {
          weiboListData = that.data.discussList.concat(res.data.data);
        }
        that.setData({
          discussList: weiboListData
        });
        callback && callback();
        wx.hideLoading();
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err, 'err 微博')
      })
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
    wx.navigateTo({
      url: `/pages/web-view/web-view?url=${srcNew}`
    });
  },
});