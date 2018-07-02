const app = getApp()
import util from '../../utils/util.js';
import http from '../../utils/http.js';
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
    totalPages: 1,
    listDataParams: {
      symbol: '',
      sort: -1,
      sortType: 5,
      limit: 20,
      start: 1
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
    wx.showNavigationBarLoading();
    this.setData({
      'listDataParams.start': 1
    });
    this.requestListData(null, function () {
      setTimeout(() => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }, 500)
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    const { totalPages } = this.data;
    const { limit, start } = this.data.listDataParams;
    if (start > limit * totalPages) {
      wx.showToast({
        title: '已没有更多数据了！',
        icon: 'none',
        duration: 3000
      })
      return false;
    }
    this.setData({
      'listDataParams.start': start + limit
    });
    const that = this;
    this.requestListData();
  }, 

  /**
   * 切换排序
   */
  handleSwitchRank(e) {
    const { rankIndex, rankColumn } = this.data;
    const { columnName } = e.currentTarget.dataset;
    const rankIndexNew = columnName === rankColumn ? (rankIndex + 1) % 3 : 0;
    let rankSort = rankIndexNew === 0 ? -1 : (rankIndexNew === 1 ? 1 : 0);
    let rankSortType = 5
    switch (columnName) {
      case 'changeDay':
        rankSortType = 4;
        break;
      case 'changeWeek':
        rankSortType = 3;
        break;
      default:
        rankSortType = 5;
    }

    if (rankSort === 0) {
      rankSort = -1
      rankSortType = 5;
    }
  

    this.setData({
      rankColumn: columnName,
      rankIndex: rankIndexNew,
      'listDataParams.start': 1,
      'listDataParams.sort': rankSort,
      'listDataParams.sortType': rankSortType
    });
    this.requestListData();
  },

  /**
   * 请求数据
   */
  requestListData(params, callback) {
    wx.showLoading({
      title: '玩命加载中',
    });
    const paramsObj = params ? params : this.data.listDataParams;
    let listData = [];
    const that = this;

    http.get(apiUrl + '/b/a/coin/cpc/search', this.data.listDataParams)
      .then((res) => {
        res.data.list.forEach(item => {
          item.base = item.base.toUpperCase();
          item.rateStrFormat = util.getFloat(item.rateStr.slice(0, -1), 2).toFixed(2) + '%';
          item.rateStrIsDown = item.rateStr.indexOf('-') > -1;
          item.closeToFixed = util.NumberLimit(item.close);
          item.closeCnyToFixed = util.NumberLimit(item.closeCny);
        })
        if (paramsObj.start === 1) {
          listData = [].concat(res.data.list);
        } else {
          listData = that.data.listData.concat(res.data.list);
        }
        that.setData({
          listData: listData,
          totalPages: res.data.totalPages
        });

        wx.hideLoading();
        callback && callback();
      })
      .catch((err) => {
        wx.hideLoading();
      })
  }
});
