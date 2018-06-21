const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchHistory: [],
    hotCoins: ['EOS', 'btn', 'ela', 'elf', 'btc', 'ltc', 'xrp'],
    isFocus: true,
    searchWord: ''
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const that = this;
    wx.getStorage({
      key: 'searchHistory',
      success: function (res) {
        if (res.data) {
          that.setData({
            searchHistory: res.data.slice(-10)
          });
        }
      }
    })
  },

  /**
   * 输入框事件--监听聚焦
   */
  handleFocus(e) {
    this.setData({
      isFocus: true
    })
  },

  /**
   * 输入框事件--监听失焦
   */
  handleBlur(e) {
    
  },

  /**
   * 输入框事件--监听输入
   */
  handleTyping(e) {
    const searchValue = e.detail.value;
    this.setData({
      searchWord: searchValue,
    })
  },

  /**
   * 输入框事件--监听回车，确认
   */
  handleSearch(e) {
    const { searchWord } = this.data
    if (!searchWord) {
      return false;
    }
    this.setSearchHistory();
    wx.navigateTo({
      url: `/pages/details/details?searchWord=${this.data.searchWord}`,
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
  },

  /**
   * 输入框事件--取消
   */
  handleCancel(e) {
    this.clearInput();
    this.setData({
      isFocus: false
    })
  },

  /**
   * 输入框事件--清空输入框值
   */
  clearInput: function () {
    this.setData({
      searchWord: ""
    });
  },

  /**
   * 设置本地搜索记录
   */
  setSearchHistory() {
    const { searchWord, searchHistory} = this.data;
    const historyNew = searchHistory.map(item => item);
    if (!historyNew.includes(searchWord)) {
      historyNew.push(searchWord)
    }
    wx.setStorage({
      key: "searchHistory",
      data: historyNew
    })
  },
  
  /**
   * 清除本地搜索记录
   */
  handleCleanSearchHistory() {
    this.setData({
      searchHistory: []
    });
    wx.removeStorage({
      key: 'searchHistory',
    })
  }
});