const app = getApp()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    rankColumn: '',
    rankTypes: ['descending', 'ascending', ''],
    rankIndex: 0,
    listData: [
      { "name": "TRUE", "new": "16850.00", "change": "3.03%", "changeWeek": "1%" },
      { "name": "BTC", "new": "6850.00", "change": "3.03%", "changeWeek": "0%" },
      { "name": "BTC", "new": "850.00", "change": "3.03%", "changeWeek": "12.98%" },
      { "name": "BTC", "new": "50.00", "change": "30.03%", "changeWeek": "20%" },
      { "name": "BTC", "new": "0.01", "change": "3.03%", "changeWeek": "90.90%" },
    ]
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

  /**
   * 切换排序
   */
  handleSwitchRank(e) {
    const { rankIndex, rankColumn } = this.data;
    const { columnName } = e.currentTarget.dataset;
    this.setData({
      rankColumn: columnName,
      rankIndex: columnName === rankColumn ? (rankIndex + 1) % 3 : 0
    });

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
  }
});
