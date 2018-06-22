const app = getApp()
import util from '../../utils/util.js';
const apiUrl = app.globalData.apiUrl;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    rankColumn: '',
    rankTypes: ['descending', 'ascending', ''],
    rankIndex: 0,
    listData: [],
    listDataParams: {
      content: '',
      sort: 0,
      sortType: '',
      limit: 20,
      start: 1,
      exchange: '',
    },
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestListData();
  },

  /**
   * 用户点击右上角分享
   */
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      'listDataParams.start': 1
    });
    this.requestListData(null, function () {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    const { listDataParams } = this.data;
    this.setData({
      'listDataParams.start': listDataParams.start + 1
    });
    wx.showLoading({
      title: '玩命加载中',
    });
    const that = this;
    this.requestListData(null, function() {
      wx.hideLoading();
    });
  }, 

  /**
   * 切换排序
   */
  handleSwitchRank(e) {
    const { rankIndex, rankColumn } = this.data;
    const { columnName } = e.currentTarget.dataset;
    const rankIndexNew = columnName === rankColumn ? (rankIndex + 1) % 3 : 0;
    this.setData({
      rankColumn: columnName,
      rankIndex: rankIndexNew,
      'listDataParams.start': 1,
      'listDataParams.sort': rankIndexNew === 0 ? -1 : (rankIndexNew === 1 ? 1 : 0),
      'listDataParams.sortType': columnName === 'changeDay' ? 4 : 3
    });
    this.requestListData();
  },

  /**
   * 请求数据
   */
  requestListData(params, callback) {
    const paramsObj = params ? params : this.data.listDataParams;
    let listData = [];
    console.log(paramsObj, 'paramsObj');
    const that = this;
    wx.request({
      url: apiUrl + '/b/a/coin/search',
      data: paramsObj,
      method: 'GET',
      success: function (res) {
        res.data.data.forEach(item => {
          item.base = item.base.toUpperCase();
          item.rateStrIsDown = item.rateStr.indexOf('-') > -1;
          item.closeToFixed = util.getFloat(item.close, 8);
          item.closeCnyToFixed = util.getFloat(item.closeCny, 8);
        })
        if (paramsObj.start === 1) {
          listData = [].concat(res.data.data);
        } else {
          listData = that.data.listData.concat(res.data.data);
        }
        that.setData({
          listData: listData
        });
        callback && callback();
      },
      fail: function (res) { },
    })
  }
});
