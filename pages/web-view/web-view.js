// pages/web-view/web-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 'options');
    let searchArr = [];
    let searchStr = '';
    for (let key in options) {
      if (key !== 'url') {
        let tempSearch = `${key}=${options[key]}`;
        searchArr.push(tempSearch);
      }
    }
    searchStr = '?' + searchArr.join('&');
    console.log(options.url + searchStr, '00')
    this.setData({
      webUrl: options.url + searchStr,
      // webUrl: 'https://mp.weixin.qq.com/s/oOAOUxD4ZQhmUCWIkR207Q'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})