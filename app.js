//app.js
App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    // apiUrl: 'https://app.diyli.cn',
    apiUrl: 'http://172.29.30.31:8101',
    // apiUrl: 'https://sapp.diyli.cn',
    // apiUrl: 'https://testsapp.diyli.cn'
  }
})