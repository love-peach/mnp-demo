const app = getApp();
import util from '../../utils/util.js';
const apiUrl = app.globalData.apiUrl;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchHistory: [],
    hotCoins: [],
    isFocus: true,
    searchWord: '',
    isEmptySearchResult: false,
    searchResult: [],
    searchResultParams: {
      content: '',
      sort: 0,
      sortType: '',
      limit: 20,
      start: 1,
      exchange: '',
    },
  },

  onLoad() {
    this.requestHotCoins();
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
      'searchResultParams.content': searchValue
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
    const that = this;
    this.requestSearchResult(null, function(res) {
      if(res.length > 0) {
        that.setSearchHistory();
        that.setData({
          isEmptySearchResult: false
        });
      } else {
        that.setData({
          isEmptySearchResult: true
        });
        console.log('暂无数据')
      }
    });
  },

  /**
   * 输入框事件--取消
   */
  handleCancel(e) {
    this.setData({
      searchWord: "",
      isFocus: false,
      searchResult: [],
      isEmptySearchResult: false
    })
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
    });
    this.setData({
      searchHistory: historyNew
    });
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
  },

  /**
   * 请求热门币种
   */
  requestHotCoins() {
    const that = this;
    wx.request({
      url: apiUrl + '/b/a/coin/hot',
      method: 'GET',
      success: function (res) {
        that.setData({
          hotCoins: res.data.data
        });
      },
      fail: function (res) { },
    })
  },

  /**
   * 请求搜索数据
   */
  requestSearchResult(params, callback) {
    const paramsObj = params ? params : this.data.searchResultParams;
    let searchResult = [];
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
          searchResult = [].concat(res.data.data);
        } else {
          searchResult = that.data.searchResult.concat(res.data.data);
        }
        that.setData({
          searchResult: searchResult
        });
        callback && callback(res.data.data);
      },
      fail: function (res) {
        wx.showToast({
          title: '请求出粗，请重新尝试',
        })
      },
    })
  },
});