const app = getApp();
import util from '../../utils/util.js';
import http from '../../utils/http.js';
const apiUrl = app.globalData.apiUrl;


var throttle = function (fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);//context调用fn的方法，指针指向了fn
    }, delay);
  }
}

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
      symbol: '',
      sort: -1,
      sortType: '',
      limit: 20,
      start: 1,
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
            searchHistory: res.data.slice(0, 10)
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
      'searchResultParams.symbol': searchValue
    })
    // throttle(this.handleSearch, 100)
    this.throttle(this.handleSearch);
  },

  /**
   * 节流函数
   */
  throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
      method.call(context);
    }, 500);
  },

  /**
   * 输入框事件--监听回车，确认
   */
  handleSearch() {
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
    });
    // wx.navigateBack({
    //   delta: 1
    // })
  },

  /**
   * 设置本地搜索记录
   */
  setSearchHistory() {
    const { searchWord, searchHistory} = this.data;
    const historyNew = searchHistory.map(item => item);
    if (!historyNew.includes(searchWord)) {
      historyNew.unshift(searchWord)
    }
    wx.setStorage({
      key: "searchHistory",
      data: historyNew
    });
    console.log(historyNew, 'historyNew');
    this.setData({
      searchHistory: historyNew.slice(0, 10)
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
   * 点击标签搜索
   */
  handelSearch(e) {
    const searchValue = e.currentTarget.dataset.searchWord;
    this.setData({
      isFocus: true,
      searchWord: searchValue,
      'searchResultParams.symbol': searchValue
    })
    this.requestSearchResult();
  },

  /**
   * 请求热门币种
   */
  requestHotCoins() {
    const that = this;
    http.get(apiUrl + '/b/a/coin/hot')
      .then(res => {
        that.setData({
          hotCoins: res.data
        });
      })
      .catch(err => {
        console.log(err, 'err 热门')
      })
  },

  /**
   * 请求搜索数据
   */
  requestSearchResult(params, callback) {
    wx.showLoading({
      title: '玩命加载中',
    });
    const paramsObj = params ? params : this.data.searchResultParams;
    let searchResult = [];
    const that = this;

    http.get(apiUrl + '/b/a/coin/cpc/search', paramsObj)
      .then(res => {
        res.data.list.forEach(item => {
          item.base = item.base.toUpperCase();
          item.rateStrFormat = util.getFloat(item.rateStr.slice(0, -1), 2).toFixed(2) + '%';
          item.rateStrIsDown = item.rateStr.indexOf('-') > -1;
          item.closeToFixed = util.NumberLimit(item.close);
          item.closeCnyToFixed = util.NumberLimit(item.closeCny);
        })
        if (paramsObj.start === 1) {
          searchResult = [].concat(res.data.list);
        } else {
          searchResult = that.data.searchResult.concat(res.data.list);
        }
        that.setData({
          searchResult: searchResult
        });
        callback && callback(res.data.list);
        wx.hideLoading();
      })
      .catch(err => {
        console.log(err, 'err 搜索')
        wx.hideLoading();
      })
  },
});